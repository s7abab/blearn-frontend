"use client";
import { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { motion } from "framer-motion";

interface Props {
  priceFilter: string;
  sortByEnrollments: boolean;
  onPriceFilterChange: (value: string) => void;
  onSortByEnrollmentsChange: (value: boolean) => void;
}
const SortCourse = ({
  priceFilter,
  sortByEnrollments,
  onPriceFilterChange,
  onSortByEnrollmentsChange,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(!open);
  }
  return (
    <>
      <div>
        <button onClick={handleOpen} className="z-20 fixed bottom-5 right-5 bg-gradient-to-tr from-gray-800 to-gray-700 hover:scale-105 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-blue-600 transition duration-300">
          <FaFilter className="text-2xl" />
        </button>
      </div>
      <>
        {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }} className="fixed w-[200px] h-48 z-10 right-10 bottom-[70px] bg-gradient-to-tr from-gray-900 to-gray-950 flex flex-col gap-4 justify-start items-start rounded-md shadow-md border-2 border-gray-700 p-4 text-white font-poppins">
            <label className="flex items-center">
              Price
              <select
                value={priceFilter}
                onChange={(e) => onPriceFilterChange(e.target.value)}
                className="ml-2 p-1 rounded border border-gray-600 bg-gray-800 text-white"
              >
                <option value="">All</option>
                <option value="low">Lowest Price</option>
                <option value="high">Highest Price</option>
              </select>
            </label>

            <label className="flex items-center">
              Most Enrolled
              <input
                type="checkbox"
                checked={sortByEnrollments}
                onChange={(e) => onSortByEnrollmentsChange(e.target.checked)}
                className="ml-2"
              />
            </label>
          </motion.div>
        )}
      </>
    </>
  );
};

export default SortCourse;
