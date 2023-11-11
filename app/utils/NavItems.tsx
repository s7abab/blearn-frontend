import Link from "next/link";
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
  return (
    <>
        {navLinks.map((link, index) => (
          <Link className="cursor-pointer" href={`${link.url}`} key={index}>
            {link.name}
          </Link>
        ))}
    </>
  );
};

export default NavItems;
