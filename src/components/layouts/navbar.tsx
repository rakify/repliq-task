'use client';
import { useUserContext } from '@/context/userContext';
import { adminLinks, customerLinks, publicLinks } from '@/utils';
import Link from 'next/link';

const Navbar = () => {
  const { currentUser, logoutUser, cart } = useUserContext();

  return (
    <nav className="bg-indigo-700 shadow-lg">
      <div className="container mx-auto">
        <div className="sm:flex justify-around">
          {/* Site Title */}
          <Link href="/" className="text-white text-3xl font-bold p-3">
            {currentUser && currentUser.isAdmin
              ? 'Welcome Admin'
              : 'Repliq Mart'}
          </Link>

          {/* Menus */}
          <ul className="text-gray-400 sm:self-center text-xl border-t sm:border-none">
            {!currentUser
              ? publicLinks.map((publicL) => (
                  <li className="sm:inline-block">
                    <Link href={publicL.link}>
                      <p className="p-3 hover:text-white">{publicL.title}</p>
                    </Link>
                  </li>
                ))
              : currentUser.accountType === 0
              ? customerLinks.map((customer) => (
                  <li className="sm:inline-block">
                    <Link href={customer.link}>
                      <p className="p-3 hover:text-white">
                        {customer.title}
                        {customer.title === 'Cart' && cart.products.length
                          ? `(${cart.products.length})`
                          : ''}
                      </p>
                    </Link>
                  </li>
                ))
              : adminLinks.map((admin) => (
                  <li className="sm:inline-block">
                    <Link href={admin.link}>
                      <p className="p-3 hover:text-white">{admin.title}</p>
                    </Link>
                  </li>
                ))}
            {currentUser && (
              <button onClick={() => logoutUser()}>
                <p className="p-3 hover:text-white">Logout</p>
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
