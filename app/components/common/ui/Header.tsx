"use client";
import NavItems from "@/app/utils/NavItems";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileImage from "../../profile/ProfileImage";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import Cookies from "js-cookie";
import Search from "../Search";
import { FaGripLines } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [token, setToken] = useState<any>("");
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cookie = Cookies.get("access_token");
    setToken(cookie);
  }, []);
  return (
    <>
      {/* navbar open */}
      {open && (
        <div className="flex-col md:hidden w-full h-screen items-center justify-center top-0 left-0 absolute dark:bg-gray-950 bg-white opacity-95 z-50">
          <div className="flex flex-col justify-center items-center gap-6 h-screen w-screen text-2xl ">
            <NavItems />
            <div className="mr-5">
          <ThemeSwitcher />
            </div>
          </div>
        </div>
      )}
      <div className="sticky top-0 bg-gray-100  bg-gradient-to-b dark:from-[#0c1625] dark:to-[#0a1321] backdrop-blur-lg duration-300 dark:text-gray-50 text-gray-950 border-none rounded-xl z-50">
        <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className=" font-Poppins self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-[#f72a4f]">
              BLearn
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {token ? (
              <Link href={"/profile"}>
                <div className="w-[40px] h-[40px] relative overflow-hidden rounded-full">
                  <ProfileImage avatar={user?.avatar} />
                </div>
              </Link>
            ) : (
              <Link href={"/login"}>
                <div className="w-[40px] h-[40px] relative overflow-hidden rounded-full">
                  <ProfileImage avatar={user?.avatar} />
                </div>
              </Link>
            )}
            <button
              onClick={() => setOpen(!open)}
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-[30px] md:hidden"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              {open ? <IoClose />  :<FaGripLines /> }
            </button>
          </div>

          {/* navbar close */}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <div className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:from-[#070210] dark:to-black duration-300 ">
              <NavItems />
              <Search
                placeholder="Search a course"
                inputStyle="p-2 rounded-full dark:bg-gray-800 bg-slate-100 dark:text-gray-100"
              />
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
