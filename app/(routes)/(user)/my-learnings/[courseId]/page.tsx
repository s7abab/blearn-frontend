"use client";
import Header from "@/app/components/common/ui/Header";
import WatchCourse from "@/app/components/user/my-learnings/watch-course/WatchCourse";
import Heading from "@/app/utils/Heading";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const WatchCoursePage = (props: Props) => {
  const { courseId } = useParams<any>();
  return (
    <>
      <Heading
        title= "my-learnings"
        description="learnings"
        keywords="course, e-learning, udemy"
      />
      <Header />
      <WatchCourse />
    </>
  );
};

export default WatchCoursePage;
