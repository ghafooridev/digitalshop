import React from 'react';
import { DATA } from '../mock/products';
import ProductItem from './ProductItem';
import { PrismaType } from '@/lib/prisma';
import { ProductsWithImages } from '@/types';

function productList(props: { products: ProductsWithImages[] }) {
  const { products } = props;
  return (
    <div className="flex flex-wrap justify-between items-center w-full my-10">
      {products.map((item) => {
        return <ProductItem key={item.name} product={item} />;
      })}
    </div>
  );
}

export default productList;
