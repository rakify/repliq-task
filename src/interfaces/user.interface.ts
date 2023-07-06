export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  accountType: number;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  secondaryPhoneNumber: string;
  currentCity: string;
  hometown: string;
  coverImg: string;
  img: string;
  followedStores: string[];
  followers: string[];
  shippingInfo: {};
  billingInfo: {};
  createdAt: Date;
  updatedAt: Date;
}

export interface ICart {
  products: [];
  total: number;
  isFetching: boolean;
  isError: boolean;
}

export interface IUserContext {
  currentUser: IUser | null;
  setCurrentUser?: Function;
  cart: ICart;
  setCart: Function;
  logoutUser: Function;
  isFetching: boolean;
  setIsFetching?: Function;
  isError: boolean;
  setIsError?: Function;
}
