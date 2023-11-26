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
      <p className="text-center px-14 md:px-36 mt-4 text-gray-600">
        {courseData?.description}
      </p>
      <div className="flex justify-center gap-6 mt-10">
        <div className="flex flex-col gap-4">
          <div className="w-[300px] bg-gradient-to-br from-[#040e2c] to-[#091336]  h-10 rounded-sm flex items-center gap-2 p-2 font-Poppins text-sm">
            <MdOutlinePlayLesson />
            <p>Get 16 lessons in 3 hours</p>
          </div>
          <div className="w-[300px] bg-gradient-to-br from-[#040e2c] to-[#091336]  h-10 rounded-sm flex items-center gap-2 p-2 font-Poppins text-sm">
            <CiChat1 />
            <p>Active community</p>
          </div>
          <div className="w-[300px] bg-gradient-to-br from-[#040e2c] to-[#091336]  h-10 rounded-sm flex items-center gap-2 p-2 font-Poppins text-sm">
            <FaPeopleGroup />
            <p>{courseData?.entrolls}+ people have joined already</p>
          </div>
          <div className="mt-4 bg-gray-900 w-full text-center h-10 align-middle cursor-pointer flex justify-center items-center gap-2 hover:bg-gray-800 duration-100">
            <CiPlay1 />
            <p className="font-Poppins">Watch Preview</p>
          </div>
        </div>
        <div className="flex flex-col w-1/3 border-2 border-gray-800">
          <div className="relative w-full h-48">
            <Image
              src={courseData?.thumbnail}
              alt="Course-img"
              objectFit="cover"
              layout="fill"
              className="rounded-md"
            />
          </div>
          <div className="w-full bg-gradient-to-br from-[#252f43] to-[#1d2232]  flex justify-center items-center font-Poppins font-semibold h-10 rounded-sm cursor-pointer gap-2">
            <AiOutlineShoppingCart />
            <p>Add to cart</p>
          </div>
          <div className="w-full bg-gradient-to-br from-[#040e2c] to-[#091336]  flex justify-center items-center font-Poppins font-semibold h-10 rounded-sm cursor-pointer mt-2">
            <span>Buy now for</span>
            &nbsp; {/* Adding space */}
            <span className="line-through text-red-600">
              ${courseData?.price}
            </span>
            &nbsp; {/* Adding space */}${courseData?.discountPrice}
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
