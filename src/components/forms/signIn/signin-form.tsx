import { login } from "@/context/apiCalls";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ILoginUserData } from "./interface";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (username.trim() === "" || password.trim() === "") {
      return;
    }
    const user: ILoginUserData = { username, password };
    try {
      const response = await login(user);

      if (response.status === 200) {
        toast.success("Login Successful");
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        router.push("/");
      } else toast.error(response.response.data.message);

      setLoading(false);
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white py-5 px-8 border-t-4 border-blue-500 rounded-md shadow-lg">
          <h2 className="text-4xl text-gray-400 mb-3">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="text-sm">Phone Number</label>
              <div className="relative">
                <span className="absolute top-1/2 left-2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                  +880
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full p-2 mt-1 bg-gray-200 rounded-md pl-14 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-2 mb-3">
              <label className="text-sm">Password</label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              />
            </div>

            <button
              disabled={loading}
              className="border-none bg-blue-500 py-2 px-3 text-white roudend-sm w-full mt-2 rounded-md hover:bg-blue-700 mb-5"
              type="submit"
            >
              Sign In
            </button>
          </form>

          <Link href="/auth/signUp" className="text-sm text-blue-400">
            Register Here
          </Link>
        </div>
      </div>
    </>
  );
};
export default SignInForm;
