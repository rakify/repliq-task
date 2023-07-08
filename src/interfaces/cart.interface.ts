import { IProduct } from './product.interface';

export interface ICartProduct
  extends Pick<
    IProduct,
    | 'title'
    | 'price'
    | 'marketPrice'
    | 'seller'
    | 'hasMerchantReturnPolicy'
    | 'img'
  > {
  quantity: number;
  productId: string;
}

export interface IAddToCartInput {
  id: string;
  product: ICartProduct;
}

export interface ICart {
  products: ICartProduct[];
  total: number;
  isFetching: boolean;
  isError: boolean;
}

export interface ICartSuccessResponse {
  data: { products: ICartProduct[]; total: number };
  status?: number;
}

export interface ICartQuantity extends ICartProduct {
  type: 'dec' | 'inc' | 'remove';
}

export interface IGroupedCart {
  [seller: string]: {
    products: ICartProduct[];
    totalAmount: number;
    totalMarketPrice: number;
  };
}
