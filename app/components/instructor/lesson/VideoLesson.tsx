"use client";
import { styles } from "@/app/styles/style";
import React, { useRef } from "react";
import { FaVideo } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";
import Progress from "../../common/spinners/Progress";
import VideoPlayer from "../../video/VideoPlayer";

interface Props  {
  handleChange: (args: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (args: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: () => void;
  loading: boolean;
  addLoading: boolean;
  video: string;
  title: string;
};

const VideoLesson = ({
  handleChange,
  handleFileChange,
  loading,
  video,
  handleSubmit,
  addLoading,
  title,
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
          className="flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-800 w-10 h-10 mr-4 "
        >
          {video.length === 0 ? (
            <FaVideo className="cursor-pointer" />
          ) : (
            <MdChangeCircle className="cursor-pointer" />
          )}
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        {video.length === 0 ? (
          <h1 className="font-Poppins text-2xl">Add Video</h1>
        ) : (
          <h1 className="font-Poppins text-2xl">Change Video</h1>
        )}
      </div>
      {video && <VideoPlayer url={video} height="100%" />}
      {loading ? (
        <div>
          <Progress />
        </div>
      ) : (
        <div className="h-[4px]"></div>
      )}
      {video && (
        <>
          <div className="mt-3">
            <h1 className="text-white text-lg mb-2 font-Poppins">Title</h1>
            <input
              onChange={handleChange}
              value={title}
              className={`p-2 cursor-${
                !video ? "not-allowed" : "pointer"
              } bg-gray-800 rounded-md w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              type="text"
              placeholder="Enter title..."
              disabled={!video}
            />
          </div>
          <div className={`flex justify-center  ${styles.primary} mt-4 w-20`}>
            <button
              className={`cursor-${addLoading} ? "not-allowed" : "pointer`}
              disabled={addLoading}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoLesson;
