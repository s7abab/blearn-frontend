import React from "react";
import { MdOndemandVideo } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import Link from "next/link";

type Props = {};

const UserTopbar = (props: Props) => {
  return (
    <div className="flex justify-center gap-5 mt-4">
      <Link
        href={"/my-learnings"}
        className="p-2 border flex justify-end items-center gap-1 font-Poppins cursor-pointer hover:bg-gray-900 rounded-md"
      >
        <MdOndemandVideo /> My Learnings
      </Link>
      <Link
        href={"/wishlist"}
        className="p-2 border flex justify-end items-center gap-1 font-Poppins cursor-pointer hover:bg-gray-900 rounded-md"
      >
        <AiOutlineLike />
        Wishlist
      </Link>
    </div>
  );
};

export default UserTopbar;
