"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React, { useState } from "react";
import Link from "next/link";
import { styles } from "../../../styles/style";

type Props = {};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Signup = (props: Props) => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      console.log(email, password);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="flex items-center h-screen">
      <div className="max-w-md mx-auto p-10 bg-white dark:bg-gray-800 rounded-md shadow-md ">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h1 className={`${styles.title} mb-3`}>Create account</h1>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 dark:text-gray-400"
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
              } rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white`}
            />
            {errors.email && touched.email && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 dark:text-gray-400"
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
                } rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white`}
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
              <FcGoogle size={30} />
            </div>
          </div>

          <h5 className="text-sm mt-3 text-center">
            Already have an account? <Link href={"/auth/login"}>Login</Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Signup;
