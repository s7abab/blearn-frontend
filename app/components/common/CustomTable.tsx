"use client";
import { styles } from "@/app/styles/style";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  data: any[];
  tableFor: string;
  fields: string[];
  url: string;
  search?: boolean;
}

const ITEMS_PER_PAGE = 5;

const CustomTable = ({ data, tableFor, fields, url, search = true }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  const filteredData = data?.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  // pagination
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  // search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination to page 1 when filtering
  };
  // view specific page
  const viewDetails = (id: string | undefined) => {
    if (id) {
      router.push(`${url}/${id}`);
    }
  };
  return (
    <div className="overflow-x-auto">
      {search && (
        <div className="">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className={`px-3 py-2  rounded-md ${styles.gray}`}
          />
        </div>
      )}
      <table className={`min-w-full shadow-md rounded-lg overflow-hidden mt-6 text-${styles.black}`}>
        <thead className={styles.gray}>
          <tr>
            <th className="py-3 px-4 lg:py-4 lg:px-6">no</th>
            {fields.map((header, index) => (
              <th key={index} className="py-3 px-4 lg:py-4 lg:px-6">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" ">
          {currentItems.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b dark:border-gray-800 cursor-pointer"
            >
              <td className="py-3 px-4 lg:py-4 lg:px-6 text-center">
                {rowIndex + 1}
              </td>
              {fields.map((field, cellIndex) => (
                <td
                  key={cellIndex}
                  onClick={() => viewDetails(row._id)}
                  className="py-3 px-4 lg:py-4 lg:px-6 text-center"
                >
                  {row[field as any]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <ul className="flex justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index} className="mx-1">
              <button
                className="px-3 py-1 rounded-md dark:bg-[#091336] dark:text-dark-primary dark:hover:bg-gray-800 bg-gray-500 text-light-primary focus:outline-none"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomTable;
