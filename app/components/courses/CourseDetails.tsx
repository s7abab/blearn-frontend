"use client";
import { ICourseDetails } from "@/@types/course/course.types";
import { styles } from "@/app/styles/style";
import Image from "next/image";
import { MdOutlinePlayLesson } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { CiPlay1 } from "react-icons/ci";
import VideoPlayer from "../video/VideoPlayer";
import CustomModal from "../modals/CustomModal";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../payment/CheckoutForm";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  courseData: ICourseDetails;
  stripePromise: any;
  clientSecret: any;
  createIntent: () => void;
};

const CourseDetails = ({
  courseData,
  stripePromise,
  clientSecret,
  createIntent,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [videoPlayer, setVideoPlayer] = useState(false);
  const [enrolledUsers, setEnrolledUsers] = useState<string[]>([]);
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (courseData && courseData.enrolls) {
      const enrolled = courseData.enrolls.filter(
        (userId: string) => userId === user?._id
      );
      setEnrolledUsers(enrolled);
    }
    //eslint-disable-next-line
  }, [courseData, user]);

  useEffect(() => {}, []);
  const handleVideoPlayerModal = () => {
    setVideoPlayer(!videoPlayer);
  };

  const handleEnrollment = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    createIntent();
    setOpen(!open);
  };
  return (
    <div>
      <>
        {videoPlayer && (
          <CustomModal
            isOpen={videoPlayer}
            onClose={handleVideoPlayerModal}
            modalHeader="Preview Video"
          >
            <VideoPlayer url={courseData?.demoUrl} />
          </CustomModal>
        )}
      </>
      <>
        {open && (
          <CustomModal isOpen={open} onClose={handleEnrollment}>
            <div className="w-full">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm courseData={courseData} />
                </Elements>
              )}
            </div>
          </CustomModal>
        )}
      </>
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
          <div className="md:flex ">
            {enrolledUsers[0] ? (
              <Link
                className="w-full bg-gradient-to-br from-[#0b3559] to-[#040e2c] text-white font-Poppins h-10 rounded-sm cursor-pointer flex items-center justify-center"
                href={"/my-learnings"}
              >
                Go to Course
              </Link>
            ) : (
              <button
                onClick={handleEnrollment}
                className="w-full bg-gradient-to-br from-[#0b3559] to-[#040e2c] text-white font-Poppins h-10 rounded-sm cursor-pointer"
              >
                Enroll Now
              </button>
            )}
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
            <FaPeopleGroup className="text-orange-700 font-bold" />6 enrolls
          </div>
          <div
            onClick={handleVideoPlayerModal}
            className="bg-gray-400 hover:bg-gray-400 dark:bg-gray-900 md:w-[300px] text-center h-10 align-middle cursor-pointer flex justify-center items-center gap-2 dark:hover:bg-gray-800 duration-100"
          >
            <CiPlay1 className="text-orange-700 font-bold" />
            <p className="font-Poppins">Watch Preview</p>
          </div>
          <div
            onClick={handleVideoPlayerModal}
            className=" bg-gray-400 hover:bg-gray-400 dark:bg-gray-900 md:w-[300px] text-center h-10 align-middle cursor-pointer flex justify-center items-center gap-2 dark:hover:bg-gray-800 duration-100"
          >
            <p className="font-Poppins font-bold">₹{courseData?.discountPrice}</p>
            <p className="line-through font-Josefin text-sm">₹{courseData?.price}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className={`${styles.title} mt-10`}>Feedbacks</h2>
      </div>
    </div>
  );
};

export default CourseDetails;
