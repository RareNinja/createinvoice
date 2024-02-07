"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import react, { useState } from "react";
import { auth } from "../firebase";

type UserProps = {
  email: string;
  password: string;
};

const PageLogin = () => {
  const [user, setUser] = useState<UserProps>({ email: "", password: "" });

  const handleUser = (key: string, value: string) => {
    setUser((oldValues: any) => ({ ...oldValues, [key]: value }));
  };

  const onSubmit = async () => {
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {})
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-login-credentials") {
          // setErrorMessage("Email ou senha inválidos, por favor verifique e tente novamente!");
        } else if (error.code === "auth/invalid-credential") {
          // setErrorMessage("Email ou senha inválidos, por favor verifique e tente novamente!");
        }
      });
  };

  return (
    <div>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e: any) => {
                      handleUser("email", e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e: any) => {
                      handleUser("password", e.target.value);
                    }}
                  />
                </div>
                <button
                  className="w-full bg-blue-500 dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={onSubmit}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
