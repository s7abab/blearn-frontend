"use client";
import { styles } from "@/app/styles/style";
import CustomModal from "../common/modals/CustomModal";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../payment/CheckoutForm";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useGetModulesQuery } from "@/redux/features/course/courseApi";
import ModuleCard from "./modules/ModulesAndLessons";
import { IModule } from "@/@types/interfaces/course/module.interface";
import Overview from "./CourseOverview";
import { ICourseDetails } from "@/@types/interfaces/course/course.interface";

type Props = {
  stripePromise: any;
  clientSecret: any;
  createIntent: () => void;
};

const CourseDetails = ({
  stripePromise,
  clientSecret,
  createIntent,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [videoPlayer, setVideoPlayer] = useState(false);
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const { course } = useSelector((state:any) => state.course);
  const { data: modulesData, isLoading: modulesLoading } = useGetModulesQuery(
    course._id
  );
  const modules: IModule[] = modulesData?.modules;

  // is instructor course
  const instructorCourse: boolean = user._id === course.instructorId;
  // is enrolled course
  const isEnrolled = course?.enrolledUsers?.some(
    (users: any) => users?.userId == user._id
  );

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
        {open && (
          <CustomModal isOpen={open} onClose={handleEnrollment}>
            <div className="w-full">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm />
                </Elements>
              )}
            </div>
          </CustomModal>
        )}
      </>
      <Overview
        handleEnrollment={handleEnrollment}
        handleVideoPlayerModal={handleVideoPlayerModal}
        instructorCourse={instructorCourse}
        isEnrolled={isEnrolled}
        videoPlayer={videoPlayer}
      />
      <div className="px-5">
        <h2 className={`${styles.title} mt-6`}>Course content</h2>
        {modules?.map((module, index) => (
          <div key={index} className="mt-2">
            <ModuleCard module={module} index={index} edit={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;
