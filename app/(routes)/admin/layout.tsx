"use client";
import Header from "@/app/components/common/ui/Header";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/common/ui/Sidebar";
import Sidebar from "@/app/components/common/ui/Sidebar";

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
        <div className="md:col-span-2 col-span-1">
          <Sidebar isAdmin={true} />
        </div>
        <div className="col-span-11 md:col-span-10 ">{children}</div>
      </div>
    </>
  );
}
