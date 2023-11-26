import { ICourseDetails } from "@/@types/course.types";
import { styles } from "@/app/styles/style";
import Image from "next/image";
import { MdOutlinePlayLesson } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { CiPlay1 } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import FeedbackCard from "../common/FeedbackCard";

type Props = {
  courseData: ICourseDetails;
};

type Feedback = {
  name: string;
  comment: string;
  rating: number;
};

const feedback: Feedback = {
  name: "Jhon",
  comment:
    " is simply dummy text of the printing and typesetting industry. Lorem Ipsum typesetting industry typesetting industry",
  rating: 3,
};

const CourseDetails = ({ courseData }: Props) => {
  return (
    <div>
      <h1 className={`${styles.title} mt-4`}>{courseData?.title}</h1>
      <p className="text-center px-14 md:px-36 md:mt-4 text-gray-600 md:block hidden">
        {courseData?.description}
      </p>
      <div className=" md:flex md:justify-center  md:gap-6 mt-10 shadow-lg md:pb-14">
        <div className="flex flex-col w-full md:w-1/3 dark:border-2 dark:border-gray-800">
          <div className="relative w-full h-48">
            <Image
              src={courseData?.thumbnail}
              alt="Course-img"
              objectFit="cover"
              layout="fill"
              className="rounded-md"
            />
          </div>
          <div className="md:flex md:gap-2">
            <button className="w-full bg-slate-400 dark:bg-gradient-to-br dark:from-[#252f43] dark:to-[#1d2232]  flex justify-center items-center font-Poppins h-10 rounded-sm cursor-pointer gap-2">
              <AiOutlineShoppingCart />
              <p>Add to cart</p>
            </button>
            <button className="w-full bg-gradient-to-br from-[#0b3559] to-[#040e2c] text-white font-Poppins h-10 rounded-sm cursor-pointer">
              Entroll Now
            </button>
          </div>
        </div>
        <div className="flex flex-col md:gap-2 mt-5 md:mt-0">
          <div className="md:w-[300px] bg-gray-300 dark:bg-gradient-to-br dark:from-[#040e2c] dark:to-[#091336]  h-10 rounded-sm flex items-center gap-2 p-2 font-Poppins text-sm">
            <MdOutlinePlayLesson className="text-blue-700 font-bold" />
            <p>Get 16 lessons in 3 hours</p>
          </div>
          <div className="md:w-[300px] bg-gray-300 dark:bg-gradient-to-br dark:from-[#040e2c] dark:to-[#091336]  h-10 rounded-sm flex items-center gap-2 p-2 font-Poppins text-sm">
            <CiChat1 className="text-green-700 font-bold" />
            <p>Active community</p>
          </div>
          <div className="md:w-[300px] bg-gray-300 dark:bg-gradient-to-br dark:from-[#040e2c] dark:to-[#091336]  h-10 rounded-sm flex items-center gap-2 p-2 font-Poppins text-sm">
            <FaPeopleGroup className="text-orange-700 font-bold" />
            <p>{courseData?.entrolls}+ people have joined already</p>
          </div>
          <div className="md:mt-4 bg-slate-400 hover:bg-gray-400 dark:bg-gray-900 md:w-[300px] text-center h-10 align-middle cursor-pointer flex justify-center items-center gap-2 dark:hover:bg-gray-800 duration-100">
            <CiPlay1 className="text-orange-700 font-bold" />
            <p className="font-Poppins">Watch Preview</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className={`${styles.title} mt-10`}>Feedbacks</h2>
        <FeedbackCard feedback={feedback} />
      </div>
    </div>
  );
};

export default CourseDetails;
