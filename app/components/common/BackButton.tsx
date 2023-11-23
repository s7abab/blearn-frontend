import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

type Props = {
  location: string;
};

const BackButton = ({ location }: Props) => {
  const router = useRouter();
  return (
    <IoMdArrowRoundBack
      onClick={() => router.push(`${location}`)}
      className="cursor-pointer absolute top-5 hover:scale-125 ease-in-out duration-100"
      size={30}
    />
  );
};

export default BackButton;
