//GET,POST,DELETE

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { promises as fs } from 'fs';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const productId = formData.get('productId') as string;

  if (!file || !productId) {
    return NextResponse.json(
      {
        error: 'Missing file or product id',
      },
      {
        status: 400,
      },
    );
  } else {
    // save image to anywhere // local / DB / cloud service

    // Read the file data as a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the directory exists
    const uploadDir = path.join(process.cwd(), 'public/assets', productId);
    await mkdir(uploadDir, { recursive: true });

    // Define the file path
    const filePath = path.join(uploadDir, file.name);

    // Write file to disk
    await writeFile(filePath, buffer);

    // Construct the public URL
    const fileUrl = `/assets/${productId}/${file.name}`;

    // save to DB using prisma

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        images: {
          create: { image: fileUrl },
        },
      },
      include: { images: true },
    });

    return NextResponse.json({
      message: 'File Uploaded Successfully',
      data: updatedProduct?.images,
    });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');
  if (!productId) {
    return NextResponse.json(
      {
        error: 'Missing product id',
      },
      {
        status: 400,
      },
    );
  } else {
    const images = await prisma.image.findMany({
      where: { productId },
    });
    return NextResponse.json({
      images,
    });
    // query string ?data=''
    // get productImage
  }
}

export async function DELETE(req: NextRequest) {
  //delete image from DB
  // delete image from local host

  const { searchParams } = new URL(req.url);
  const imageId = searchParams.get('imageId');
  if (!imageId) {
    return NextResponse.json(
      {
        error: 'Missing image id',
      },
      {
        status: 400,
      },
    );
  }
  const image = await prisma.image.findUnique({
    where: {
      id: imageId,
    },
    include: { Product: true },
  });

  if (!image) {
    return NextResponse.json(
      {
        error: 'invalid image id',
      },
      {
        status: 400,
      },
    );
  }

  // Construct the file path from stored URL
  const imagePath = path.join(process.cwd(), 'public', image.image);

  // Remove the image file from the filesystem
  try {
    await fs.unlink(imagePath);
    console.log(`Deleted file: ${imagePath}`);
  } catch (fileError) {
    console.error(`Error deleting file ${imagePath}:`, fileError);
    return NextResponse.json(
      { error: 'File deletion failed' },
      { status: 500 },
    );
  }

  await prisma.image.delete({ where: { id: imageId } });

  return NextResponse.json(
    {
      message: 'Image deleted successfully',
      data: image.productId,
    },
    {
      status: 200,
    },
  );
}
