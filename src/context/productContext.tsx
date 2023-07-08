'use client';

import { IProductContext } from '@/interfaces/product.interface';
import { createContext, useContext } from 'react';

export const ProductContext = createContext<IProductContext>({
  products: null,
  isFetching: false,
  setIsFetching: () => {},
  isError: false,
  setIsError: () => {},
});

export const useProductContext = () => useContext(ProductContext);
