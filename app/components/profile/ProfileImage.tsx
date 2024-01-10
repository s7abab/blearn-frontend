"use client";
import useGetS3Link from "@/app/hooks/useGetS3Link";
import Image from "next/image";
import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import SmallLoader from "../common/spinners/SmallLoader";

interface Props  {
  avatar: string;
};

const ProfileImage = ({ avatar }: Props) => {
  const { loading, getFileUrl, s3Url } = useGetS3Link();
  useEffect(() => {
    if (avatar) {
      getFileUrl(avatar);
    }
    // eslint-disable-next-line
  }, [avatar]);
  return (
    <>
      {loading ? (
        <SmallLoader />
      ) : (
        <>
          {avatar ? (
            <Image alt="Profile" src={s3Url} layout="fill" objectFit="cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-800 dark:text-white shadow-lg">
              <CgProfile size={100} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProfileImage;
