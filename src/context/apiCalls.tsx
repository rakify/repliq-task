import {
  ILoginSuccessResponse,
  ILoginUserData,
} from "@/components/forms/signIn/interface";
import { IRegisterUserData } from "@/components/forms/signUp/interface";
import axios, { AxiosError } from "axios";

axios.defaults.withCredentials = true; //so its can set automatically the cookie i want
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api"
    : "https://bestmart-api.vercel.app/api";
//User
export const login = async (user: ILoginUserData) => {
  try {
    const { data, status }: ILoginSuccessResponse = await axios.post(
      "/auth/login",
      user
    );
    return { data, status };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // server responded with error
      return {
        data: axiosError.response.data,
        status: axiosError.response.status,
      };
    } else if (axiosError.request) {
      // request is successful but no response was received
      return { data: axiosError.request };
    } else {
      // error in handing request
      return { data: axiosError.message };
    }
  }
};

export const register = async (user: IRegisterUserData) => {
  try {
    const res = await axios.post(`/auth/register`, user);
    return res;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // server responded with error
      return {
        data: axiosError.response.data,
        status: axiosError.response.status,
      };
    } else if (axiosError.request) {
      // request is successful but no response was received
      return { data: axiosError.request };
    } else {
      // error in handing request
      return { data: axiosError.message };
    }
  }
};

//Products
//(public)
export const getProducts = async () => {
  try {
    const { data, status } = await axios.get("/products/?new=true");
    return { data, status };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // server responded with error
      return {
        data: axiosError.response.data,
        status: axiosError.response.status,
      };
    } else if (axiosError.request) {
      // request is successful but no response was received
      return { data: axiosError.request };
    } else {
      // error in handing request
      return { data: axiosError.message };
    }
  }
};
