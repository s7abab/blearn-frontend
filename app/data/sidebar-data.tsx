import { MdDashboard } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";

export const adminItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: <MdDashboard /> },
  { title: "Courses", url: "/admin/courses", icon: <FaVideo /> },
  { title: "Requests", url: "/admin/applications", icon: <FaWpforms /> },
  {
    title: "Instructors",
    url: "/admin/instructors",
    icon: <FaChalkboardTeacher />,
  },
  { title: "Users", url: "/admin/users", icon: <FaPeopleGroup /> },
  { title: "Payments", url: "/admin/payments", icon: <MdPayments /> },
  { title: "Category", url: "/admin/category", icon: <MdCategory /> },
];

export const instructorItems = [
  { title: "Dashboard", url: "/instructor/dashboard", icon: <MdDashboard /> },
  { title: "Courses", url: "/instructor/courses", icon: <FaVideo /> },
  { title: "Community", url: "/instructor/community", icon: <IoChatbox /> },
  { title: "Payments", url: "/instructor/payments", icon: <MdPayments /> },
  { title: "Profile", url: "/instructor/profile", icon: <MdPeopleAlt /> },
];
