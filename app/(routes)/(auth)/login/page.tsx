"use client";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { styles } from "../../../styles/style";
import Link from "next/link";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { schema } from "@/app/utils/validations/login.validation";
import BackButton from "@/app/components/common/BackButton";

type Props = {};

const Login = (props: Props) => {
  const [login, { isSuccess, error }] = useLoginMutation();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/profile");
    }
  }, [session, router]);
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });
  // login api
  useEffect(() => {
    if (isSuccess) {
      router.push("/");
      toast.success("Login Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [router, error, isSuccess]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="flex items-center h-screen">
      <BackButton location="/" />
      <div className="800px:w-[400px] 400px:w-[320px] mx-auto p-10 bg-gray-800 rounded-md shadow-md ">
        <h1 className={`${styles.title} mb-3`}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="name@email.com"
              className={`mt-1 p-2 w-full border ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white`}
            />
            {errors.email && touched.email && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                id="password"
                onChange={handleChange}
                value={values.password}
                placeholder="password!@%"
                className={` mt-1 p-2 w-full border ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white`}
              />
            </div>
            {errors.password && touched.password && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>
          <div className="mb-4 mt-8">
            <button type="submit" className={`${styles.primary} w-full`}>
              Submit
            </button>
          </div>
          <div className="flex justify-center  items-center mt-3">
            <div>
              <FcGoogle
                className="cursor-pointer"
                size={30}
                onClick={() => {
                  signIn("google");
                }}
              />
            </div>
          </div>
          <h5 className="text-sm mt-3 text-center">
            Not have an account? <Link href={"/signup"}>Sign up</Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Login;
