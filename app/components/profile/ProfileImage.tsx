"use client";
import Image from "next/image";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

type Props = {};

const ProfileImage = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <>
      {user.avatar ? (
        <Image
          alt="Profile"
          src={user.avatar}
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <CgProfile size={100} />
        </div>
      )}
    </>
  );
};

export default ProfileImage;
