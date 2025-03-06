import { prisma, PrismaType } from '@/lib/prisma';
import ProductListView from '@/modules/products/views/ProductListView';
import React from 'react';

async function Products() {
  const data: PrismaType.Product[] = await prisma.product.findMany(); //query // mutation
  return (
    <div>
      <ProductListView />
    </div>
  );
}

export default Products;
