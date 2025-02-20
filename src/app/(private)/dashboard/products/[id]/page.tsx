import ProductDetailView from '@/modules/products/views/ProductDetailView';
import React from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const data = await params;
  const { id } = data;
  return (
    <div>
      <ProductDetailView id={id} />
    </div>
  );
};

export default page;
