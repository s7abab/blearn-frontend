"use client";
import Header from "@/app/components/ui/Header";
import Sidebar from "@/app/components/ui/InstructorSidebar";
import Protected from "@/app/hooks/useProtected";
import Heading from "@/app/utils/Heading";

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
      <Protected> 
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-10 m-5">{children}</div>
      </div>
    </Protected>
    </>
  );
}
