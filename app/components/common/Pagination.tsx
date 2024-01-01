"use client";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: Props) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevClick = () => {
    if (!isFirstPage && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastPage && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="cursor-pointer dark:bg-gray-800 bg-[#f72a4f] p-2 rounded-full hover:bg-slate-700 font-Poppins shadow-md text-dark-primary "
        onClick={handlePrevClick}
        disabled={isFirstPage || isLoading}
      >
        <FaArrowCircleLeft size={25} />
      </button>
      <span>
        {" "}
        Page {currentPage} of {totalPages}{" "}
      </span>
      <button
        className="cursor-pointer dark:bg-gray-800 bg-[#f72a4f] p-2 rounded-full hover:bg-slate-700 font-Poppins text-dark-primary"
        onClick={handleNextClick}
        disabled={isLastPage || isLoading}
      >
        <FaArrowCircleRight size={25} />
      </button>
    </div>
  );
};

export default Pagination;
