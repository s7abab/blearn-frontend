"use client";
import React, { useEffect, useState } from "react";
import CustomModal from "../modals/CustomModal";
import { ILesson } from "@/@types/course/lesson.types";
import toast from "react-hot-toast";
import uploadVideo from "@/app/utils/video-upload";
import { useAddLessonMutation } from "@/redux/features/course/courseApi";
import VideoLesson from "./lesson/VideoLesson";
import DocumentLesson from "./lesson/Document";
import LessonCard from "../modules/LessonCard";
import { useSelector } from "react-redux";

type Props = {
  index: number;
};

const AddLesson = ({ index }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { courseId } = useSelector((state: any) => state.course);
  const [lessonDetails, setLessonDetails] = useState<ILesson>({
    courseId: courseId,
    index: index,
    type: "",
    title: "",
    url: "",
    duration: 1,
  });
  const [uploadLesson, { isSuccess, error }] = useAddLessonMutation();

  const handleUploadLesson = async () => {
    await uploadLesson(lessonDetails);
    handleModal();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Lesson added");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleModal = () => {
    setOpen(!open);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    setLessonDetails({
      ...lessonDetails,
      type: e.target.value,
    });
    setOpen(true);
  };

  const handleLessonTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLessonDetails({
      ...lessonDetails,
      title: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    try {
      setLoading(true);
      const videoUrl = await uploadVideo(file);
      if (videoUrl) {
        setLessonDetails({
          ...lessonDetails,
          url: videoUrl,
        });
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
    //eslint-disable-next-line
  }, [file]);
  return (
    <div className="mt-5">
      {selectedOption === "video" && (
        <CustomModal onClose={handleModal} isOpen={open}>
          <VideoLesson
            handleChange={handleLessonTitle}
            handleFileChange={handleFileChange}
            loading={loading}
            video={lessonDetails.url}
            handleSubmit={handleUploadLesson}
          />
        </CustomModal>
      )}
      {selectedOption === "document" && (
        <CustomModal onClose={handleModal} isOpen={open}>
          <DocumentLesson
            handleChange={handleLessonTitle}
            handleFileChange={handleFileChange}
            loading={loading}
            video={lessonDetails.url}
            handleSubmit={handleUploadLesson}
          />
        </CustomModal>
      )}
      <select
        onChange={handleSelectChange}
        className="p-1 rounded-md  font-Josefin text-dark-primary  cursor-pointer"
      >
        <option value={""}> Add lesson</option>
        <option value={"video"}>Video</option>
        <option value={"document"}>Document</option>
      </select>
    </div>
  );
};

export default AddLesson;
