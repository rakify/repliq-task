'use client';

import { UserContext, defaultCart } from '@/context/userContext';
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

  useEffect(() => {
    const userDataString = localStorage.getItem('currentUser');

    if (userDataString) {
      try {
        const userData: IUser = JSON.parse(userDataString);
        setCurrentUser(userData);
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
      value={{ currentUser, isFetching, isError, cart, setCart, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
