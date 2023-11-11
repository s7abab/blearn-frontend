import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex items-center">
      <div className="container mx-auto flex items-center justify-between p-8 md:p-16">
        <div className="flex flex-col items-center md:flex-row md:space-x-8">
          <div className="mb-6 md:mb-0 rounded-full bg-gray-900">
            <Image src="/assets/hero.svg" alt="Hero" width={500} height={500} />
          </div>
          <div className=" md:text-left">
            <h1 className=" font-Josefin font[600] text-[50px] dark:text-gray-50 text-gray-900 cursor-pointer">
              Learn With BLearner
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-4">
              Start your learning journey with BLearner. Explore a world of knowledge and skills.
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-4">
              Join our community for continuous growth and discovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
