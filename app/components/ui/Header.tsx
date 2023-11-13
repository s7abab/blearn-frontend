"use client";
import NavItems from "@/app/utils/NavItems";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import Link from "next/link";
import React, { useState } from "react";
import { styles } from "../../styles/style";

type Props = {};

const Header = (props: Props) => {
  const [modal, setModal] = useState(true);
  return (
    <nav className="sticky top-0 bg-gradient-to-b dark:bg-gradient-to-b from-gray-200 to-gray-300  dark:from-[#040f1e] dark:to-[#071323] duration-300 dark:text-gray-50 text-gray-950 border-none rounded-xl">
      <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            BLearn
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className={`${styles.primary} w-20`}>
            <Link href={"/auth/login"}>Login</Link>
          </div>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <div className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:from-[#070210] dark:to-black duration-300 ">
            <NavItems />
            <input
              className="p-2 rounded-full"
              type="text"
              placeholder="Search a course"
            />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
