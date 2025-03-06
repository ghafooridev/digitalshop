import React from 'react';
import ProductForm from '../components/ProductForm';
import { getProductById, getProductsAPI } from '../services';

async function ProductDetailView(props: { id: string }) {
  const { id } = props;
  const product = await getProductById(id);
  const products = await getProductsAPI();
  console.log(products);
  return (
    <div>
      <ProductForm product={product} />
    </div>
  );
}

export default ProductDetailView;
