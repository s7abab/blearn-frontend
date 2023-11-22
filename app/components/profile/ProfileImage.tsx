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
        <CgProfile size={100} />
      )}
    </>
  );
};

export default ProfileImage;
