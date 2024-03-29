"use client";
import VideoPlayer from "../video/VideoPlayer";
import CustomModal from "../common/modals/CustomModal";
import { styles } from "@/app/styles/style";
import { useSelector } from "react-redux";
import Link from "next/link";
import { MdOutlinePlayLesson } from "react-icons/md";
import { CiChat1, CiPlay1 } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import CourseImage from "./CourseImage";

interface Props {
  videoPlayer: boolean;
  handleVideoPlayerModal: () => void;
  isEnrolled: boolean;
  instructorCourse: boolean;
  handleEnrollment: () => void;
}

const Overview = ({
  videoPlayer,
  handleVideoPlayerModal,
  isEnrolled,
  instructorCourse,
  handleEnrollment,
}: Props) => {
  const { course } = useSelector((state: any) => state.course);

  return (
    <>
      {VideoPlayer && (
        <CustomModal
        courseSide={true}
          isOpen={videoPlayer}
          onClose={handleVideoPlayerModal}
          modalHeader="Preview Video"
        >
          <VideoPlayer url={course?.demoUrl} height="100%" />
        </CustomModal>
      )}
      <h1 className={`${styles.title} mt-4`}>{course?.title}</h1>
      <p className="text-center px-14 md:px-36 md:mt-4 text-gray-600 md:block hidden">
        {course?.description}
      </p>
      <div className=" md:flex md:justify-center  md:gap-6 mt-10 md:pb-14">
        <div className="flex flex-col w-full md:w-1/3 ">
          <div className="relative w-full h-48">
            <CourseImage imgUrl={course?.thumbnail} />
          </div>
          <div className="md:flex ">
            {isEnrolled ? (
              <Link
                className={`w-full dark:bg-gradient-to-tr rounded-full font-Poppins h-10 mt-2 cursor-pointer flex items-center justify-center ${styles.purple_gradient}`}
                href={"/my-learnings"}
              >
                Go to Course
              </Link>
            ) : instructorCourse ? (
              <Link
                href={"/instructor/courses"}
                className={`w-full dark:bg-gradient-to-tr rounded-full font-Poppins h-10 mt-2 cursor-pointer flex items-center justify-center ${styles.purple_gradient}`}
              >
                Go to Course
              </Link>
            ) : (
              <button
                onClick={handleEnrollment}
                className={`w-full dark:bg-gradient-to-tr rounded-full font-Poppins h-10 mt-2 cursor-pointer flex items-center justify-center ${styles.purple_gradient}`}
              >
                Enroll Now
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:gap-2 mt-5 md:mt-0">
          <div className="md:w-[300px] bg-gray-300 dark:bg-gradient-to-br  h-10 rounded-sm flex items-center gap-2 p-2 font-Josefin text-sm">
            <MdOutlinePlayLesson className="text-blue-700 font-bold" />
            Get {course?.totalLessons} lessons
          </div>
          <div className="md:w-[300px] bg-gray-300 dark:bg-gradient-to-br  h-10 rounded-sm flex items-center gap-2 p-2 font-Josefin text-sm">
            <CiChat1 className="text-green-700 font-bold" />
            <p>Active community</p>
          </div>
          <div className="md:w-[300px] bg-gray-300 dark:bg-gradient-to-br  h-10 rounded-sm flex items-center gap-2 p-2 font-Josefin text-sm">
            <FaPeopleGroup className="text-orange-700 font-bold" />
            {course?.enrolledUsers?.length} enrolls
          </div>
          <div
            onClick={handleVideoPlayerModal}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-900 md:w-[300px] text-center h-10 align-middle cursor-pointer flex justify-center items-center gap-2 dark:hover:bg-gray-800 duration-100"
          >
            <CiPlay1 className="text-orange-700 font-bold" />
            <p className="font-Poppins">Watch Preview</p>
          </div>
          <div className= {`${styles.purple_gradient} md:w-[300px] text-center h-10 align-middle cursor-pointer flex justify-center items-center gap-2 dark:hover:bg-gray-800 duration-100`}>
            <p className="font-Poppins font-bold text-gray-50">
              ${course?.discountPrice}
            </p>
            <p className="line-through font-Josefin text-sm">
              ${course?.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
