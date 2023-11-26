import Link from "next/link";
import React from "react";

type Props = {
};

const sidebarItems = [
  { title: "Dashboard", url: "/instructor/courses" },
  { title: "Courses", url: "/instructor/courses" },
  { title: "Community", url: "/instructor/courses" },
  { title: "Payments", url: "/instructor/courses" },
  { title: "Promotions", url: "/instructor/courses" },
  { title: "Profile", url: "/instructor/profile" },
];
const InstructorSidebar = (props: Props) => {
  return (
    <div className="fixed mt-2 left-0 h-[89vh] w-[200px] flex flex-col items-center gap-6 pt-20 rounded-lg bg-gradient-to-tr from-gray-400 to-gray-200 duration-300 text-light-primary dark:bg-gradient-to-b dark:from-[#051429] dark:to-black dark:text-gray-50 border-gray-400 dark:border-gray-50 border-r-2 z-40">
      {sidebarItems.map((items, index) => (
        <div
          className="hover:bg-gray-400 dark:hover:bg-[#183356] hover:rounded-md pt-2 w-full h-10 text-center hover:border-10 font-Poppins"
          key={index}
        >
          <Link href={items.url}>{items.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default InstructorSidebar;
