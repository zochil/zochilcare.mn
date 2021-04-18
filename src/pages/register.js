import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthDispatch, useAuthState } from "../context/auth";
import { useFormik } from "formik";

function Register() {
    const [phone, setPhone] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [password, setPassword] = useState("");
    const [regno, setRegno] = useState("");
    const [errors, setErrors] = useState({});
    const { authenticated } = useAuthState();
    const router = useRouter();
  
    if(authenticated) router.push('/')
  
    const submitForm = async (event) => {
      event.preventDefault();
  
  
      try {
        await axios.post("/users/register-with-phone", {
          phone,
          first_name,
          last_name,
          password,
          regno
        });
  
        router.push("/verify");
      } catch (error) {
        console.log(error);
        setErrors(error.response.data);
      }
    };
  

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50 sm:px-6 lg:px-8">
      <Head>
        <title>Burtguuleh</title>
      </Head>
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="w-auto h-12 mx-auto"
            src="/images/logo.png"
            alt="Workflow"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Бүртгүүлэх
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            эсвэл
            <a
              href="#"
              className="pl-1 font-medium text-blue-600 hover:text-blue-500"
            >
              нэвтрэх
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
                type="text"
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
                id="first_name"
                name="first_name"
                type="text"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Нэр"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                error={errors.first_name}
              />
            </div>
            <div>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Овог нэр"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                error={errors.last_name}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Нууц үг"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
            </div>
            <div>
              <input
                id="regno"
                name="regno"
                type="text"
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Регистергийн дугаар"
                value={regno}
                onChange={(e) => setRegno(e.target.value)}
                error={errors.regno}
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
              Бүртгүүлэх
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
