import React from 'react';
import ProductForm from '../components/ProductFormWithAction';
import { getProductById } from '../services';

async function ProductDetailView(props: { id: string }) {
  const { id } = props;
  const product = await getProductById(id);
  return (
    <div>
      <ProductForm product={product} />
    </div>
  );
}

export default ProductDetailView;
