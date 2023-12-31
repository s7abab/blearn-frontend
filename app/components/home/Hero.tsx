import Image from "next/image";
import React from "react";
import { BiSearch } from "react-icons/bi";

const Hero = () => {
  return (
    <div className="mx-[150px] md:mt-[100px] mt-[20px]">
      <div className="">
        <div className=" items-center md:flex-row md:space-x-8 justify-center ">
          <div className="">
            <Image className="absolute opacity-90 -z-10 " src="/assets/home.png" alt="hero" width={200} height={200} />
          </div>
          <h1 className=" font-Poppins text-center font-bold 1000px:text-[45px] 800px:text-[35px] 400px:text-[25px]  cursor-pointer 400px:mt-4 dark:text-dark-primary text-light-primary">
            Unleash your inner{" "}
            <span className=" bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text">
              programming
            </span>{" "}
            <span className=" bg-gradient-to-r from-purple-600 to-blue-300 text-transparent bg-clip-text">
              genius
            </span>{" "}
            with our community.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4"></p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
