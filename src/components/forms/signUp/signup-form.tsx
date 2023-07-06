import { register } from "@/context/apiCalls";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { IRegisterUserData } from "./interface";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      repeatPassword.trim() === "" ||
      email.trim() === ""
    ) {
      setLoading(false);
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toast.error("Please provide a valid email");
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(username)) {
      toast.error("Please provide valid phone number");
      setLoading(false);
      return;
    }

    const user: IRegisterUserData = {
      username,
      email,
      password,
      repeat_password: repeatPassword,
    };
    try {
      const response = await register(user);

      if (response.status === 201) {
        toast.success("Registration successful, you may login now");
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        router.push("/auth/signIn");
      } else if (response.response.data.err.code === 11000) {
        toast.error("Phone number or email already exists");
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
          <h2 className="text-4xl text-gray-400 mb-3">Register</h2>

          <form onSubmit={handleSubmit} noValidate={true}>
            <div className="mb-2">
              <label className="text-sm">Phone Number</label>
              <div className="relative">
                <span className="absolute top-1/2 left-2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                  +880
                </span>
                <input
                  type="text"
                  minLength={10}
                  maxLength={10}
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full p-2 mt-1 bg-gray-200 rounded-md pl-14 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-2 mb-3">
              <label className="text-sm">Email</label>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              />
            </div>

            <div className="mt-2 mb-3">
              <label className="text-sm">Password</label>
              <input
                type="password"
                required
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              />
            </div>

            <div className="mt-2 mb-3">
              <label className="text-sm">Repeat Password</label>
              <input
                type="password"
                required
                value={repeatPassword}
                placeholder="Password"
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              />
            </div>

            <button
              disabled={loading}
              className="border-none bg-blue-500 py-2 px-3 text-white roudend-sm w-full mt-2 rounded-md hover:bg-blue-700 mb-5"
              type="submit"
            >
              Register
            </button>
          </form>

          <Link href="/auth/signIn" className="text-sm text-blue-400">
            Login Here
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
