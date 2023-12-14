"use client";
import React, { useEffect, useState } from "react";
import CustomModal from "../../common/modals/CustomModal";
import toast from "react-hot-toast";
import uploadVideo from "@/app/utils/video-upload";
import { useAddLessonMutation } from "@/redux/features/course/courseApi";
import VideoLesson from "./VideoLesson";
import DocumentLesson from "./Document";
import { useSelector } from "react-redux";
import { ILesson } from "@/@types/interfaces/course/lesson.interface";

type Props = {
  index: number;
  edit: boolean;
  lesson?: ILesson;
};

const AddLesson = ({ index, edit, lesson }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [open, setOpen] = useState<boolean>(edit);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { course } = useSelector((state: any) => state.course);
  const [lessonDetails, setLessonDetails] = useState<ILesson>({
    courseId: lesson?.courseId || course?._id,
    index: lesson?.index || index,
    type: lesson?.type || "",
    title: lesson?.title || "",
    url: lesson?.url || "",
    duration: lesson?.duration || 1,
  });
  const [uploadLesson, { isSuccess, error, isLoading }] =
    useAddLessonMutation();
  const handleUploadLesson = async () => {
    await uploadLesson(lessonDetails);
    setLessonDetails({
      courseId: course?._id,
      index: index,
      type: "",
      title: "",
      url: "",
      duration: 1,
    });
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
    setSelectedOption("");
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
      {(selectedOption === "video" || lesson?.type === "video") && (
        <CustomModal onClose={handleModal} isOpen={open}>
          <VideoLesson
            handleChange={handleLessonTitle}
            handleFileChange={handleFileChange}
            loading={loading}
            addLoading={isLoading}
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
            addLoading={isLoading}
            video={lessonDetails.url}
            handleSubmit={handleUploadLesson}
          />
        </CustomModal>
      )}
      {!edit &&  (
        <select
          value={selectedOption} // Set value to selectedOption state
          onChange={handleSelectChange}
          className="p-1 rounded-md  font-Josefin text-dark-primary  cursor-pointer"
        >
          <option value={""}> Add lesson</option>
          <option value={"video"}>Video</option>
          <option value={"document"}>Document</option>
        </select>
      )}
    </div>
  );
};

export default AddLesson;
