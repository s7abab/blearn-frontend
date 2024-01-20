"use client";
import { useState } from "react";
import SwitchTab from "../SwithTab";
import Overview from "../dashboard/CourseDashboard";
import { useGetSingleCourseForInstructorQuery } from "@/redux/features/course/courseApi";
import { useParams } from "next/navigation";
import AddUpdateCourse from "./AddUpdateCourse";
import CourseContents from "./CourseContents";

const CourseOverview = () => {
  const { courseId } = useParams<any>();
  const [tab, setTab] = useState<string>("overview");
  const { data: course } =
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
      {tab === "contents" && <CourseContents />}
    </div>
  );
};

export default CourseOverview;
