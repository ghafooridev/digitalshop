import Spinner from '@/components/Spinner';
import ProductDetailView from '@/modules/products/views/ProductDetailView';
import React, { Suspense } from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const data = await params;
  const { id } = data;
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <ProductDetailView id={id} />
      </Suspense>
    </div>
  );
};

export default page;
