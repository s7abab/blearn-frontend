"use client";
import useFileUpload from "@/app/hooks/useS3Upload";
import { styles } from "@/app/styles/style";
import { useInstructoApplicationMutation } from "@/redux/features/user/userApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ApplicationStatus = () => {
  const [file, setfile] = useState<File | null>(null);
  const [docUrl, setDocUrl] = useState<string>("");
  const { user } = useSelector((state: any) => state.auth);
  const [applyAsInstructor, { isSuccess, error }] =
    useInstructoApplicationMutation();
  // upload file hook
  const { uploadFile } = useFileUpload();

  const router = useRouter();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setfile(file);
    }
  };
  // submit doc
  const handleSubmit = async () => {
    if (!docUrl) toast.error("Pleasse choose a document");
    await applyAsInstructor({ docUrl: docUrl });
  };
  // handle uploading the document
  const uploadDocument = async () => {
    try {
      const url = await uploadFile(file);
      setDocUrl(url);
    } catch (error) {
      toast.error("Error uploading document");
    }
  };

  useEffect(() => {
    if (file) {
      uploadDocument();
    }
    // eslint-disable-next-line
  }, [file]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Application submitted successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        router.push("/");
      }
    }
    // eslint-disable-next-line
  }, [isSuccess, error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-2xl p-6 bg-gray-800 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center font-Poppins">
          Application Status
        </h1>
        {user.applicationStatus === "pending" ? (
          <div className="bg-gray-700 p-4 rounded-lg mb-4 font-Josefin">
            <p className="text-lg mb-2">
              Thank you for your interest in becoming an instructor.
            </p>
            <p className=" flex flex-col">
              Your application is currently pending for approvel. Please check
              back later.
              <Link
                href="/"
                className={`font-Poppins ${styles.secondary_Btn} mt-5`}
              >
                Go to home page
              </Link>
            </p>
          </div>
        ) : (
          <>
            <div className="bg-gray-700 p-4 rounded-lg mb-4 font-Josefin">
              <p className="text-lg mb-2">
                Thank you for your interest in becoming an instructor.
              </p>
              <p className="text-lg mb-2">
                To proceed further, please upload an identity proof.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <ul>
                <li>- Passport</li>
                <li>- Drivering License</li>
                <li>- Voter ID Card</li>
              </ul>
              <input type="file" className="mt-2" onChange={handleFileChange} />
              <button
                disabled={isSuccess}
                className={`text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-Poppins ${styles.secondary_Btn}`}
                onClick={handleSubmit}
              >
                Upload Identity Proof
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;
