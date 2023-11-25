"use client";
import { ICourseDataForTable } from "@/@types/course.types";
import { IUserDataForTable } from "@/@types/user.types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  data: IUserDataForTable[] | ICourseDataForTable[];
  tableFor: string;
  fields: string[];
  url: string;
};

const ITEMS_PER_PAGE = 5;

const CustomTable = ({ data, tableFor, fields, url }: Props) => {
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
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className=" px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#091336] text-gray-50 bg-[#040e2c]"
        />
      </div>
      <table className="min-w-full shadow-md rounded-lg overflow-hidden mt-14">
        <thead className="bg-gradient-to-br from-[#040e2c] to-[#091336] shadow-2xl text-gray-50">
          <tr>
            <th className="py-3 px-4 lg:py-4 lg:px-6">no</th>
            {fields.map((header, index) => (
              <th key={index} className="py-3 px-4 lg:py-4 lg:px-6">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-50 bg-gradient-to-br from-[#05081b] to-[#050d2e] shadow-2xl ">
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
                  {
                    row[
                      field as keyof (IUserDataForTable | ICourseDataForTable)
                    ]
                  }
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
                className="px-3 py-1 rounded-md bg-[#091336] text-gray-50 hover:bg-gray-800 focus:outline-none"
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
