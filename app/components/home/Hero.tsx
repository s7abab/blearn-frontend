import Image from "next/image";
import React from "react";
import { BiSearch } from "react-icons/bi";

const Hero = () => {
  return (
    <div className="w-full flex items-center">
      <div className="container mx-auto flex items-center justify-between p-8 md:p-16">
        <div className="flex flex-col items-center md:flex-row md:space-x-8">
          <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] rounded-full bg-gradient-to-b from-[#122c4d] to-black duration-300 dark:text-gray-50 ">
            <Image src="/assets/hero.svg" alt="Hero" width={500} height={500} priority={true} />
          </div>
          <div className=" md:text-left">
            <h1 className=" font-Poppins  font-[600] 1000px:text-[40px] 800px:text-[35px] 400px:text-[25px] text-dark-primary cursor-pointer 400px:mt-8">
              Start your learning journey with BLearner
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-4"></p>
            <div className="flex">
              <input
                type="text"
                placeholder="Search a course"
                className="px-10 rounded-sm bg-gray-800"
              />

              <BiSearch className="m-2 " size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
