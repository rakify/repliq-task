import Image from 'next/image';
import Products from './products/page';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';

export default function Home() {
  return (
    <main className="">
      <Products />
    </main>
  );
}
