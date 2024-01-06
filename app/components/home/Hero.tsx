import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import avatar1 from "../../../public/assets/avatar1.jpg";
import avatar2 from "../../../public/assets/avatar2.jpg";
import avatar3 from "../../../public/assets/avatar3.jpg";
import avatar4 from "../../../public/assets/avatar4.jpg";
import avatar5 from "../../../public/assets/avatar5.jpg";
import { MdVerifiedUser } from "react-icons/md";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="mt-[80px]">
      <div className=" items-center md:flex-row justify-center ">
        <div className="flex justify-center">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image src={avatar1} alt="avatar1" width={100} height={100} />
          </div>
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image src={avatar3} alt="avatar3" width={100} height={100} />
          </div>
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image src={avatar2} alt="avatar2" width={100} height={100} />
          </div>
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image src={avatar4} alt="avatar4" width={100} height={100} />
          </div>
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image src={avatar5} alt="avatar5" width={100} height={100} />
          </div>
          <div className="w-[40px] h-[40px] text-[40px] dark:text-purple-500 text-[#f72a4f]">
            <MdVerifiedUser />
          </div>
        </div>
        <h1 className="relative font-Poppins text-center font-thin 1000px:text-[40px] 800px:text-[35px] 400px:text-[25px]  cursor-pointer 400px:mt-4 text-gray-600">
          Grow your skills for a <br />
          secure future with <br />
          <span className="animate-pulse text-[#f72a4f] dark:bg-gradient-to-r dark:from-purple-600 dark:to-blue-400 dark:text-transparent dark:bg-clip-text font-bold text-[40px]">
            BLEARN
          </span>
        </h1>
      </div>
      <div className="flex justify-center gap-2">
        <Link
          href={"/courses"}
          className={`dark:bg-gradient-to-tr dark:from-purple-900 dark:to-purple-500 px-5 py-3 rounded-full bg-[#f72a4f] text-gray-50`}
        >
          EXPLORE MORE
        </Link>
        <Link
          href={"/courses"}
          className="px-7 py-3 rounded-full border-[1.5px] dark:border-purple-500 border-[#f72a4f] "
        >
          <FaArrowRight />
        </Link>
      </div>
      <div className="flex flex-col items-center gap-1 w-full mt-4">
        <h1 className="font-Josefin text-gray-600">
          Trusted by 1000+ students
        </h1>
        <div className="bg-gray-600 w-24 h-1 rounded-full "></div>
      </div>
    </div>
  );
};

export default Hero;
