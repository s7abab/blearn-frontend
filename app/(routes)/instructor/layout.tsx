"use client";
import Header from "@/app/components/ui/Header";
import Loader from "@/app/components/spinners/Loader";
import Sidebar from "@/app/components/ui/InstructorSidebar";
import Heading from "@/app/utils/Heading";
import { useSelector } from "react-redux";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <>
      {user ? (
        <>
          <Heading
            title="courses"
            description="Create read and update courses"
            keywords="courses,development,commerce"
          />
          <Header />
          <div className="grid grid-cols-12">
            <div className="col-span-2">
              <Sidebar />
            </div>
            <div className="col-span-10 m-5">{children}</div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
