"use client";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { styles } from "../../../styles/style";
import {
  useRegisterMutation,
  useSocialAuthMutation,
} from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import OtpModal from "@/app/components/modals/OtpModal";
import { signIn, useSession } from "next-auth/react";
import { schema } from "@/app/utils/validations/register.validation";
import BackButton from "@/app/components/common/BackButton";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

type Props = {};

const Signup = (props: Props) => {
  const [show, setShow] = useState(false);
  const [verification, setVerification] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [register, { isLoading, isSuccess, data, error }] =
    useRegisterMutation();
  const router = useRouter();

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

  const { data: sessionData } = useSession();
  const { user } = useSelector((state: any) => state.auth);
  const [socialAuth, { isSuccess: sessionSuccess }] = useSocialAuthMutation();

  useEffect(() => {
    if (!user) {
      if (sessionData) {
        socialAuth({
          email: sessionData?.user?.email,
          name: sessionData?.user?.name,
          avatar: sessionData?.user?.image,
        });
      }
    }
  }, [sessionData, user, sessionSuccess, socialAuth, router]);

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmpassword: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password, confirmpassword }) => {
      const data = {
        name,
        email,
        password,
        confirmpassword,
      };
      setFormData(data);
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="flex items-center h-screen">
      <BackButton location="/" />
      {verification && <OtpModal data={formData} />}
      <div className="800px:w-[400px] 400px:w-[320px] mx-auto p-10 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md ">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h1 className={`${styles.title} mb-3`}>Create account</h1>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 dark:text-gray-400"
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
              } rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white`}
            />
            {errors.name && touched.name && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
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
                name="password"
                type="password"
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
            </div>
            {errors.password && touched.password && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="confirmpassword"
                type="password"
                id="confirmpassword"
                onChange={handleChange}
                value={values.confirmpassword}
                placeholder="password!@%"
                className={` mt-1 p-2 w-full border ${
                  errors.confirmpassword && touched.confirmpassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white`}
              />
            </div>
            {errors.confirmpassword && touched.confirmpassword && (
              <span className="text-sm text-red-500">{errors.confirmpassword}</span>
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
