import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

type Props = {};

const navLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/",
  },
  {
    name: "Teach",
    url: "/",
  },
];

const NavItems = (props: Props) => {
  const linkVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <>
      {navLinks.map((link, index) => (
        <Link href={`${link.url}`} key={index}>
          <div className="cursor-pointer inline-block mr-4">
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
