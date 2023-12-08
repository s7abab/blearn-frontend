"use client";
import React, { useState } from "react";
import SwitchTab from "./SwithTab";
import Overview from "./Overview";
import { useGetSingleCourseForInstructorQuery } from "@/redux/features/course/courseApi";
import { useParams } from "next/navigation";
import AddModule from "./Modules";
import AddUpdateCourse from "./AddUpdateCourse";

type Props = {};

const CourseOverview = (props: Props) => {
  const { courseId } = useParams<any>();
  const [tab, setTab] = useState<string>("overview");
  const { data: course, isLoading } =
    useGetSingleCourseForInstructorQuery(courseId);

  const handleTabChange = (value: string) => {
    setTab(value);
  };
  return (
    <div className="min-h-screen mt-5">
      <SwitchTab handleClick={handleTabChange} />
      {tab === "overview" && <Overview />}
      {tab === "edit" && (
        <AddUpdateCourse edit={true} course={course?.course} />
      )}
      {tab === "contents" && <AddModule />}
    </div>
  );
};

export default CourseOverview;
