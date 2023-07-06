"use client";

import { ICart, IUserContext } from "@/interfaces/user";
import { createContext, useContext } from "react";

export const defaultCart: ICart = {
  products: [],
  total: 0,
  isError: false,
  isFetching: false,
};

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  setCurrentUser: () => {},
  cart: defaultCart,
  setCart: () => {},
  logoutUser: () => {},
  isFetching: false,
  setIsFetching: () => {},
  isError: false,
  setIsError: () => {},
});

export const useUserContext = () => useContext(UserContext);
