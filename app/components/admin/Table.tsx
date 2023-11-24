"use client";
import { styles } from "@/app/styles/style";
import React from "react";

type Data = {
  name?: string;
  email?: string;
  title?: string;
};
type Props = {
  data: Data[];
  role: string;
  isCourse: boolean;
};

const Users = ({ data, role, isCourse }: Props) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <h1 className={styles.title}>{role}</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-400 mt-5">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3 w-1/4">
              No
            </th>
            <th scope="col" className="px-4 py-3">
              {isCourse ? "Name" : "Email"}
            </th>
            <th scope="col" className="px-4 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((data, index) => (
            <tr key={index} className="bg-gray-800">
              <td className="px-4 py-4">{index + 1}</td>
              <td className="px-4 py-4 flex gap-3 cursor-pointer">
                {isCourse ? data?.title : data?.email}
              </td>
              <td className="px-4 py-4 cursor-pointer">View</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
