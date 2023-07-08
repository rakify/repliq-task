'use client';

import { getCartProducts } from '@/context/apiCalls';
import { UserContext, defaultCart } from '@/context/userContext';
import { ICart, ICartSuccessResponse } from '@/interfaces/cart.interface';
import { Props } from '@/interfaces/default.interface';
import { IUser } from '@/interfaces/user.interface';
import { useEffect, useState } from 'react';

export default function UserProvider({ children }: Props) {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [cart, setCart] = useState(defaultCart);

  const logoutUser = () => {
    setCurrentUser(null);
    setCart(defaultCart);
    localStorage.clear();
  };

  const fetchCartProducts = async (id: string) => {
    setIsFetching(true);
    try {
      const response: ICartSuccessResponse = await getCartProducts(id);

      if (response.status && response.status === 200) {
        const cart: ICart = {
          products: response.data.products,
          total: response.data.total,
          isError: false,
          isFetching: false,
        };
        setCart(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      setIsFetching(false);
    } catch (error) {
      setIsError(true);
      setIsFetching(false);
    }
  };

  // setup user
  useEffect(() => {
    const userDataString = localStorage.getItem('currentUser');
    const cartDataString = localStorage.getItem('cart');

    if (userDataString) {
      try {
        const userData: IUser = JSON.parse(userDataString);
        setCurrentUser(userData);
        //fetch cart from api if it is not available locally
        if (!cartDataString) fetchCartProducts(userData._id);
        if (cartDataString) setCart(JSON.parse(cartDataString));
        setIsFetching(false);
      } catch (error) {
        setIsError(true);
      }
    } else {
      setIsFetching(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isFetching,
        setIsFetching,
        isError,
        setIsError,
        cart,
        setCart,
        logoutUser,
        fetchCartProducts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
