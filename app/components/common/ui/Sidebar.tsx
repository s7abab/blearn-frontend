import Link from "next/link";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";

interface Props {
  isAdmin: boolean;
}

const adminItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: <MdDashboard /> },
  { title: "Courses", url: "/admin/courses", icon: <FaVideo /> },
  {
    title: "Instructors",
    url: "/admin/instructors",
    icon: <FaChalkboardTeacher />,
  },
  { title: "Users", url: "/admin/users", icon: <FaPeopleGroup /> },
  { title: "Payments", url: "/admin/payments", icon: <MdPayments /> },
  { title: "Category", url: "/admin/category", icon: <MdCategory /> },
];

const instructorItems = [
  { title: "Dashboard", url: "/instructor/dashboard", icon: <MdDashboard /> },
  { title: "Courses", url: "/instructor/courses", icon: <FaVideo /> },
  { title: "Community", url: "/instructor/community", icon: <IoChatbox /> },
  { title: "Payments", url: "/instructor/payments", icon: <MdPayments /> },
  { title: "Profile", url: "/instructor/profile", icon: <MdPeopleAlt /> },
];

const Sidebar = ({ isAdmin }: Props) => {
  return (
    <div className="fixed mt-2 left-0 h-[89vh] w-[200px] flex flex-col items-center gap-6 pt-20 rounded-lg duration-300 text-light-primary dark:bg-gradient-to-b dark:from-[#051429] dark:to-black dark:text-gray-50 border-gray-400 dark:border-gray-50 border-r-2 z-40 ">
      {isAdmin
        ? adminItems.map((item, index) => (
            <div
              className="hover:bg-gray-400 dark:hover:bg-[#183356] hover:rounded-md pt-2 w-full h-10 text-center hover:border-10 font-Poppins"
              key={index}
            >
              <Link href={item.url}>{item.title}</Link>
            </div>
          ))
        : instructorItems.map((item, index) => (
            <div
              className="hover:bg-gray-400 dark:hover:bg-[#183356] hover:rounded-md pt-2 w-full h-10 text-center hover:border-10 font-Poppins"
              key={index}
            >
              <div className="flex items-center px-10 gap-3">
                {item.icon}
                <Link href={item.url}>{item.title}</Link>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Sidebar;
