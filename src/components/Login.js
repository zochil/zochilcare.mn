import { FormEvent, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { useRouter } from "next/router";
import { useAuthDispatch, useAuthState } from "../context/auth";
import * as storage from "../lib/storage";

function LoginComponent() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  const router = useRouter();


  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const res = await Axios.post("/users/login", {
        phone,
        password,
      });
      const { access_token } = res.data;
      storage.setItem("access_token", access_token);
      dispatch("LOGIN", res.data);

     
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (authenticated) router.push("/");
    // const { pathname } = router;
    // if (pathname == "/login") {
    //   router.push("/");
    // }
  });
  return (
    <div className="flex items-center justify-center w-full min-h-screen px-4 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="w-auto h-12 mx-auto"
            src="/images/logo.png"
            alt="Workflow"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Дусал
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            эсвэл
            <a
              href="#"
              className="pl-1 font-medium text-blue-600 hover:text-blue-500"
            >
              бүртгүүлэх
            </a>
          </p>
        </div>
        <form onSubmit={submitForm} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <input
                id="phone"
                name="phone"
                type="phone"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Утасны дугаар"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Нууц үг"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-blue-500 group-hover:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Нэвтрэх
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
