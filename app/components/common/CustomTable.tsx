"use client";
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
            className=" px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#091336] dark:text-dark-primary text-light-primary  dark:bg-[#040e2c] bg-gray-300"
          />
        </div>
      )}
      <table className="min-w-full shadow-md rounded-lg overflow-hidden mt-6">
        <thead className="dark:bg-gradient-to-br dark:from-[#040e2c] dark:to-[#091336] dark:text-dark-primary bg-gray-300 shadow-2xl text-light-primary">
          <tr>
            <th className="py-3 px-4 lg:py-4 lg:px-6">no</th>
            {fields.map((header, index) => (
              <th key={index} className="py-3 px-4 lg:py-4 lg:px-6">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-100 dark:text-dark-primary bg-gradient-to-br dark:from-[#05081b] dark:to-[#050d2e] shadow-2xl ">
          {currentItems.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-[#101f3d] cursor-pointer"
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
