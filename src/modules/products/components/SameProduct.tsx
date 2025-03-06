import React from 'react';
import { getProductById } from '../services';

async function SameProduct(props: { id: string }) {
  const { id } = props;
  const product = await getProductById(id);
  return <div>same Products ....</div>;
}

export default SameProduct;
