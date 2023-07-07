import { IUser } from '@/interfaces/user.interface';

export interface ILoginUserData {
  username: string;
  password: string;
}
export interface ILoginSuccessResponse {
  data: IUser;
  status: number;
}
