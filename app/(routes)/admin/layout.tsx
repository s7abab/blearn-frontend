"use client";
import Header from "@/app/components/ui/Header";
import Loader from "@/app/components/spinners/Loader";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/ui/AdminSidebar";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Heading
        title="courses"
        description="Create read and update courses"
        keywords="courses,development,commerce"
      />
      <Header />
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <AdminSidebar />
        </div>
        <div className="col-span-10 m-5">{children}</div>
      </div>
    </>
  );
}
