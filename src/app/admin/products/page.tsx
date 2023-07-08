'use client';

import ProductList from '@/components/admin-pages/product-list';

const AdminProducts = () => {
  return (
    <>
      <div className="mt-8 mb-0 text-center text-lg font-bold">
        Product List
      </div>
      <ProductList />
    </>
  );
};
export default AdminProducts;
