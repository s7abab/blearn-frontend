const Footer = () => {
  return (
    <footer className="mt-10 flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-gray-600 py-6 text-center md:justify-between">
      <p className="text-blue-gray font-normal">&copy; 2024 B Learn</p>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-50 font-normal hover:text-gray-600"
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-50 font-normal hover:text-gray-600"
          >
            Contribute
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-600 dark:text-gray-50 font-normal hover:text-gray-600"
          >
            Contact Us
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
