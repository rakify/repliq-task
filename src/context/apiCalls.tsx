import { ILoginUserData } from "@/components/forms/signIn/interface";
import axios from "axios";

axios.defaults.withCredentials = true; //so its can set automatically the cookie i want
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api"
    : "https://bestmart-api.vercel.app/api";
//User
export const login = async (user: ILoginUserData) => {
  try {
    const { data, status } = await axios.post("/auth/login", user);
    return { data, status };
  } catch (error) {
    return error;
  }
};

//Products
//(public)
export const getProducts = async () => {
  try {
    const { data, status } = await axios.get("/products/?new=true");
    return { data, status };
  } catch (error) {
    return error;
  }
};
