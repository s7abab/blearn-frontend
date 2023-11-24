import Link from "next/link";
import React from "react";

type Props = {};

const sidebarItems = [
  { title: "Dashboard", url: "/admin/dashboard" },
  { title: "Courses", url: "/admin/courses" },
  { title: "Instructors", url: "/admin/instructors" },
  { title: "Users", url: "/admin/users" },
  { title: "Payments", url: "/admin/courses" },
  { title: "Category", url: "/admin/category" },
];
const AdminSidebar = (props: Props) => {
  return (
    <div className="fixed mt-2 left-0 h-[89vh] w-[200px] flex flex-col items-center gap-6 pt-20 rounded-lg bg-gradient-to-b from-[#051429] to-black duration-300 text-gray-50  border-r-2 z-40">
      {sidebarItems.map((items, index) => (
        <div
          className="hover:bg-[#183356] hover:rounded-md pt-2 w-full h-10 text-center hover:border-10 font-Poppins"
          key={index}
        >
          <Link href={items.url}>{items.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default AdminSidebar;
