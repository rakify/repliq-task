import { ICart } from '@/interfaces/cart.interface';
import { IUserContext } from '@/interfaces/user.interface';
import { createContext, useContext } from 'react';

export const defaultCart: ICart = {
  products: [],
  total: 0,
  isError: false,
  isFetching: false,
};

const INITIAL_STATE = {
  currentUser: null,
  setCurrentUser: () => {},
  logoutUser: () => {},
  isFetching: false,
  setIsFetching: () => {},
  isError: false,
  setIsError: () => {},
  cart: defaultCart,
  setCart: () => {},
  fetchCartProducts: () => {},
};

export const UserContext = createContext<IUserContext>(INITIAL_STATE);

export const useUserContext = () => useContext(UserContext);
