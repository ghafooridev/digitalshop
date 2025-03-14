//GET,POST,DELETE Cart

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  if (userId) {
    const cartItem = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    return NextResponse.json(cartItem);
  }
  return NextResponse.json([]);
}

export async function POST(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { productId } = await req.json();

  const existingCartItem = await prisma.cartItem.findFirst({
    where: { productId, userId },
  });
  if (existingCartItem) {
    const updatedItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    });

    return NextResponse.json(updatedItem);
  }
  const newCartItem = await prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity: 1,
    },
  });

  return NextResponse.json(newCartItem);
}

export async function DELETE(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { productId } = await req.json();

  const existingCartItem = await prisma.cartItem.findFirst({
    where: { productId, userId },
  });
  if (!existingCartItem) {
    return NextResponse.json(
      { error: 'cart item does not exist' },
      { status: 400 },
    );
  }
  if (existingCartItem) {
    const deletedItem = await prisma.cartItem.delete({
      where: { id: existingCartItem.id },
    });

    return NextResponse.json(deletedItem);
  }
}
