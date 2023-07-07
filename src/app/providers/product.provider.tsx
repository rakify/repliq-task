'use client';

import { getProducts } from '@/context/apiCalls';
import { ProductContext } from '@/context/productContext';
import { Props } from '@/interfaces/default.interface';
import {
  IProduct,
  IProductSuccessResponse,
} from '@/interfaces/product.interface';
import { useEffect, useState } from 'react';

export default function ProductProvider({ children }: Props) {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState<IProduct[] | null>(null);

  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      const response: IProductSuccessResponse = await getProducts();
      if (response.status && response.status === 200) {
        localStorage.setItem('products', JSON.stringify(response.data));
      }
      setIsFetching(false);
    } catch (error) {
      setIsError(true);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    let productsDataString = localStorage.getItem('products');
    // if products doesnt exist lets fetch them
    if (!productsDataString) {
      fetchProducts();
      productsDataString = localStorage.getItem('products');
    }

    if (productsDataString) {
      try {
        const productsData: IProduct[] = JSON.parse(productsDataString);
        setProducts(productsData);
        setIsFetching(false);
      } catch (error) {
        setIsError(true);
      }
    } else {
      setIsFetching(false);
    }
  }, []);

  return (
    <ProductContext.Provider value={{ products, isFetching, isError }}>
      {children}
    </ProductContext.Provider>
  );
}
