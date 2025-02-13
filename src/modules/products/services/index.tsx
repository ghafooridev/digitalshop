import { prisma } from '@/lib/prisma';

// export const getProducts = async () => {
//   const result = await prisma.product.findMany({ include: { images: true } });
//   return result;
// };

export const getProductsAPI = async () => {
  const result = await fetch('/api/product');
  const response = await result.json();
  return response;
};

export const getProductById = async (id: string) => {
  const result = await prisma.product.findFirst({
    where: { id },
    include: { images: true },
  });
  if (!result) {
    return null;
  }
  return result;
};
