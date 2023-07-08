'use client';
import { useUserContext } from '@/context/userContext';
import Products from './products/page';
import AdminProducts from './admin/products/page';

export default function Home() {
  const { currentUser } = useUserContext();
  return (
    <main className="">
      {currentUser && currentUser.isAdmin ? <AdminProducts /> : <Products />}
    </main>
  );
}
