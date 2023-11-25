"use client";
import Image from "next/image";
import React from "react";
import { CgProfile } from "react-icons/cg";

type Props = {
  avatar:string
};

const ProfileImage = ({avatar}: Props) => {
  return (
    <>
      {avatar ? (
        <Image
          alt="Profile"
          src={avatar}
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
