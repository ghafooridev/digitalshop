import CatalogList from '@/components/catalog/List';
import CatalogSelector from '@/components/catalog/Selector';
import React from 'react';

function Catalog() {
  return (
    <div className="flex flex-col items-center mx-auto my-4">
      <CatalogList />
      <CatalogSelector />
    </div>
  );
}

export default Catalog;
