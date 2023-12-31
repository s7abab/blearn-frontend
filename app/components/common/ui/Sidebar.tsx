import { adminItems, instructorItems } from "@/app/data/sidebar-data";
import Link from "next/link";

interface Props {
  isAdmin: boolean;
}

const Sidebar = ({ isAdmin }: Props) => {
  return (
    <div className="fixed mt-2 left-0 h-[89vh] w-[200px] flex flex-col items-center gap-6 pt-20 rounded-lg duration-300 text-light-primary  dark:text-gray-50 border-gray-400 dark:border-gray-50 border-r-2 z-40 ">
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
