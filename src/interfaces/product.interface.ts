export interface IProduct {
  _id: string;
  seller: string;
  title: string;
  desc: string;
  img: string;
  slug: string;
  cat: string[];
  tags: string[];
  marketPrice: number;
  price: number;
  unit: string;
  size: string;
  color: string;
  brand: string;
  weight: string;
  hasMerchantReturnPolicy: boolean;
  model: string;
  inStock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductContext {
  products: IProduct[] | null;
  isFetching: boolean;
  setIsFetching?: Function;
  isError: boolean;
  setIsError?: Function;
}
