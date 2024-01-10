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
  };
  return (
    <>
      <div>
        <button
          onClick={handleOpen}
          className="z-20 bg-gray-700 hover:scale-105 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-500 transition duration-300"
        >
          <FaFilter className="text-2xl" />
        </button>
      </div>
      <>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-[85px] h-screen w-[200px] z-10 bg-white dark:bg-gray-900 flex flex-col gap-4 justify-start items-start rounded-md shadow-lg p-4  font-poppins"
          >
            <label className="flex items-center">
              Price
              <select
                value={priceFilter}
                onChange={(e) => onPriceFilterChange(e.target.value)}
                className="ml-2 p-1 rounded border border-gray-600   font-Poppins"
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
