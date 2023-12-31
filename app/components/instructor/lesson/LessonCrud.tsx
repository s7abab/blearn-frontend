"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useAddLessonMutation,
  useUpdateLessonMutation,
} from "@/redux/features/course/courseApi";
import { useSelector } from "react-redux";
import { ILesson } from "@/@types/interfaces/course/lesson.interface";
import LessonInput from "./LessonInput";
import useFileUpload from "@/app/hooks/useS3Upload";

interface Props {
  edit: boolean;
  lesson?: ILesson;
  lessonIndex?: number;
  moduleId: string;
}

const LessonCrud = ({ edit, lesson, lessonIndex, moduleId }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [open, setOpen] = useState<boolean>(edit);
  const [file, setFile] = useState<File | null>(null);
  const { course } = useSelector((state: any) => state.course);
  const intitalState = {
    courseId: lesson?.courseId || course?._id,
    moduleId: moduleId,
    lessonIndex: lessonIndex || 0,
    type: lesson?.type || "",
    title: lesson?.title || "",
    url: lesson?.url || "",
    duration: lesson?.duration || 1,
  };
  const [lessonDetails, setLessonDetails] = useState<ILesson>(intitalState);
  const [uploadLesson, { isSuccess, error }] = useAddLessonMutation();
  // upload to s3
  const { loading: uploading, uploadFile } = useFileUpload();
  const [
    updateLesson,
    { isSuccess: updateSuccess, error: updateError, isLoading: updateLoading },
  ] = useUpdateLessonMutation();
  console.log(lessonDetails);
  const handleModal = () => {
    setOpen(!open);
    setSelectedOption("");
  };
  // update lesson
  const handleUpdateLesson = async () => {
    await updateLesson(lessonDetails);

    setLessonDetails(intitalState);
    handleModal();
  };
  // updload lesson
  const handleUploadLesson = async () => {
    if (edit) {
      handleUpdateLesson();
    } else {
      await uploadLesson(lessonDetails);
      setLessonDetails(intitalState);
      handleModal();
    }
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
      const videoUrl = await uploadFile(file);
      if (videoUrl) {
        setLessonDetails({
          ...lessonDetails,
          url: videoUrl,
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
    //eslint-disable-next-line
  }, [file]);

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
  // update lesson toast
  useEffect(() => {
    if (updateSuccess) {
      toast.success("Lesson updated");
    }
    if (updateError) {
      if ("data" in updateError) {
        const errorData = updateError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [updateSuccess, updateError]);
  return (
    <LessonInput
      handleFileChange={handleFileChange}
      handleLessonTitle={handleLessonTitle}
      handleModal={handleModal}
      handleSelectChange={handleSelectChange}
      handleUploadLesson={handleUploadLesson}
      isLoading={uploading}
      loading={uploading}
      lessonDetails={lessonDetails}
      open={open}
      selectedOption={selectedOption}
      edit={edit}
      lesson={lesson}
    />
  );
};

export default LessonCrud;
