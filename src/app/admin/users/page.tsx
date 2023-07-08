'use client';

import UserList from '@/components/admin-pages/user-list';

const AdminUsers = () => {
  return (
    <>
      <div className="mt-8 mb-0 text-center text-lg font-bold">
        Customer List
      </div>
      <UserList />
    </>
  );
};
export default AdminUsers;
