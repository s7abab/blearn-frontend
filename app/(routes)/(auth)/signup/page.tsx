"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { styles } from "../../../styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import OtpModal from "@/app/components/modals/OtpModal";
import { signIn } from "next-auth/react";

type Props = {};

const schema = Yup.object().shape({
  name: Yup.string()
    .matches(/^\S*$/, "Name must not contain spaces")
    .required("Please enter your name!"),
  email: Yup.string()
    .matches(/^\S*$/, "Email must not contain spaces")
    .email("Invalid Email!")
    .required("Please enter your email!"),
  password: Yup.string()
    .required("Please enter your password!")
    .matches(/^\S*$/, "Password must not contain spaces")
    .min(6, "Password must be at least 6 characters"),
});

const Signup = (props: Props) => {
  const [show, setShow] = useState(false);
  const [verification, setVerification] = useState(false);
  const [register, { isLoading, isSuccess, data, error }] =
    useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successfull";
      toast.success(message);
      setVerification(true);
      setTimeout(() => {
        setVerification(false);
        setShow(false);
      }, 120000);
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="flex items-center h-screen">
      {verification && <OtpModal />}
      <div className="800px:w-[400px] 400px:w-[320px] mx-auto p-10 bg-gray-800 rounded-md shadow-md ">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h1 className={`${styles.title} mb-3`}>Create account</h1>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="Jhon"
              className={`mt-1 p-2 w-full border ${
                errors.name && touched.name
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white`}
            />
            {errors.name && touched.name && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
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
                type={!show ? "password" : "text"}
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
              {show ? (
                <AiOutlineEye
                  size={20}
                  className="absolute  cursor-pointer right-2 bottom-2"
                  onClick={() => setShow(!show)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={20}
                  className="absolute  cursor-pointer right-2 bottom-2"
                  onClick={() => setShow(!show)}
                />
              )}
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
                onClick={() => {
                  signIn("google");
                }}
                className="cursor-pointer"
                size={30}
              />
            </div>
          </div>
          <h5 className="text-sm mt-3 text-center">
            Already have an account? <Link href={"/login"}>Login</Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Signup;
