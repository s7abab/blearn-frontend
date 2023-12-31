"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";

const NavItems = () => {
  const linkVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
  };
  const { user } = useSelector((state: any) => state.auth);

  const navLinks = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Courses",
      url: "/courses",
    },
    {
      name: "Teach",
      url:
        user.role === "instructor"
          ? "/instructor/courses"
          : "/become-an-instructor",
    },
  ];
  return (
    <>
      {navLinks.map((link, index) => (
        <Link href={`${link.url}`} key={index}>
          <div className="cursor-pointer inline-block mr-4 font-Poppins">
            <motion.div
              className="cursor-pointer inline-block mr-4"
              variants={linkVariants}
              whileHover="hover"
              initial="initial"
            >
              {link.name}
            </motion.div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default NavItems;
