'use server';

import { prisma } from '@/lib/prisma';
import { Product, ProductCategory } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const getProducts = async () => {
  const result = await prisma.product.findMany({ include: { images: true } });
  return result;
};

export const getProductsAPI = async () => {
  // const result = await fetch('/api/product');
  const result = await fetch('http://localhost:3000/api/product', {
    next: { revalidate: 30 },
  });
  const response = await result.json();
  return response;
};

export const getProductById = async (id: string) => {
  console.log('product', id);
  // throw new Error('some errors from server please try again');
  // await new Promise((resolve) => setTimeout(resolve, 4000));
  const result = await prisma.product.findFirst({
    where: { id },
    include: { images: true },
  });
  if (!result) {
    return null;
  }
  return result;
};

export const upsertProduct = async (product: Product) => {
  const { id } = product;
  let result;
  if (id) {
    result = await prisma.product.update({
      where: {
        id,
      },
      data: product,
    });
  } else {
    result = await prisma.product.create({
      data: product,
    });
  }

  revalidatePath('/dashboard/products');

  return result;
};

export const deleteProduct = async (id: string) => {
  await prisma.product.delete({ where: { id } });
  redirect('/dashboard/products');
};
