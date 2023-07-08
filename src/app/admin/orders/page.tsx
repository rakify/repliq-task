'use client';
import OrderList from '@/components/admin-pages/order-list';

const AdminOrders = () => {
  return (
    <>
      <div className="mt-8 mb-0 text-center text-lg font-bold">Order List</div>
      <OrderList />
    </>
  );
};
export default AdminOrders;
