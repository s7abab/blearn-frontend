"use client";
import { styles } from "@/app/styles/style";
import React, { useRef } from "react";
import Progress from "../../spinners/Progress";
import { IoIosCloudDone } from "react-icons/io";
import { IoIosDocument } from "react-icons/io";

type Props = {
  handleChange: (args: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (args: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  loading: boolean;
  video: string;
};

const DocumentLesson = ({
  handleChange,
  handleFileChange,
  loading,
  video,
  handleSubmit,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="bg-gray-900 rounded-md shadow-lg p-6 border-none ">
      <div className="h-[100px] flex items-center justify-center text-white text-3xl ">
        <label
          onClick={handleClick}
          htmlFor="fileInput"
          className="flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-800 w-16 h-16 mr-4 "
        >
          {video.length === 0 ? (
            <IoIosDocument className="cursor-pointer" />
          ) : (
            <IoIosCloudDone />
          )}
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        {video.length === 0 ? (
          <h1 className="font-Poppins text-xxl">Add Document</h1>
        ) : (
          <h1 className="font-Poppins text-xxl">Document Added</h1>
        )}
      </div>
      {loading ? (
        <div>
          <Progress />
        </div>
      ) : (
        <div className="h-[4px]"></div>
      )}
      <div className="mt-3">
        <h1 className="text-white text-lg mb-2">Title</h1>
        <input
          onChange={handleChange}
          className="p-2 bg-gray-800 rounded-md w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter title..."
        />
      </div>
      <div className={`flex justify-center  ${styles.primary} mt-4 w-20`}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default DocumentLesson;
