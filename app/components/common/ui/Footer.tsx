import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center mt-11 border-t border-gray-600 py-6 text-center md:justify-between z-50">
      <p className="text-blue-gray font-normal">&copy; 2024 B Learn</p>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <Link
          href={"/aboutus"}
          className="text-gray-600 dark:text-gray-50 font-normal hover:text-gray-600"
        >
          About Us
        </Link>
        <Link
          href={"https://github.com/s7abab/blearn-backend"}
          className="text-gray-600 dark:text-gray-50 font-normal hover:text-gray-600"
        >
          Contribute
        </Link>
        <Link
          href={"contactus"}
          className="text-gray-600 dark:text-gray-50 font-normal hover:text-gray-600"
        >
          Contact Us
        </Link>
      </ul>
    </footer>
  );
};

export default Footer;
