"use client";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import Link from "next/link";
import { styles } from "../../../styles/style";
import {
  useRegisterMutation,
  useSocialAuthMutation,
} from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import OtpModal from "@/app/components/common/modals/OtpModal";
import { signIn, useSession } from "next-auth/react";
import { schema } from "@/app/utils/validations/register.validation";
import BackButton from "@/app/components/common/BackButton";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import registerInputFields from "@/app/data/register-inputFields";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const Signup = () => {
  const [show, setShow] = useState(false);
  const [verification, setVerification] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [register, { isLoading, isSuccess, data, error }] =
    useRegisterMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
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
  }, [user, router]);

  const formik = useFormik<FormData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, password, confirmpassword }) => {
      const data: FormData = {
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
        <form onSubmit={handleSubmit} className="mb-4">
          <h1 className={`${styles.title} mb-3`}>Create account</h1>
          {registerInputFields.map((field) => (
            <div key={field.name} className="mb-4">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={field.type}
                  name={field.name}
                  value={values[field.name as keyof FormData]}
                  onChange={handleChange}
                  id={field.name}
                  placeholder={field.placeholder}
                  className={`mt-1 p-2 w-full border ${
                    errors[field.name as keyof FormData] &&
                    touched[field.name as keyof FormData]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white`}
                />
              </div>
              {errors[field.name as keyof FormData] &&
                touched[field.name as keyof FormData] && (
                  <span className="text-sm text-red-500">
                    {errors[field.name as keyof FormData]}
                  </span>
                )}
            </div>
          ))}
          <div className="mb-4 mt-8">
            <button
              disabled={isLoading}
              type="submit"
              className={`${styles.primary} w-full`}
            >
              Submit
            </button>
          </div>
          <div className="flex justify-center items-center mt-3">
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
