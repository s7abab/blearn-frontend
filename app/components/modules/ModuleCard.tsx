"use client";
import { IModule } from "@/@types/course/course.types";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import CourseContents from "../instructor/CourseContents";
import {
  useDeletModuleMutation,
  useGetLessonsForInstructorQuery,
} from "@/redux/features/course/courseApi";
import { useSelector } from "react-redux";
import { ILesson } from "@/@types/course/lesson.types";
import LessonCard from "./LessonCard";
import { FaEdit } from "react-icons/fa";
import AddModule from "../instructor/AddModule";
import CustomModal from "../modals/CustomModal";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmBox from "../modals/ConfirmBox";

type Props = {
  module: IModule;
  index: number;
  edit: boolean;
};

const ModuleCard = ({ module, index, edit }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [lesson, setLesson] = useState<boolean>(false);
  const { courseId } = useSelector((state: any) => state.course);
  const { data } = useGetLessonsForInstructorQuery({
    courseId,
    index,
  });
  const [deleteModule, { isLoading }] = useDeletModuleMutation();
  const lessons: ILesson[] = data?.lessons;

  const handleDeleteModule = () => {
    deleteModule({
      courseId,
      index,
    });
  };
  const toggleLesson = () => {
    setLesson(!lesson);
  };
  const toggleModal = () => {
    setOpen(!open);
  };
  const toggleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };
  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  };

  useEffect(() => {
    if (confirmDelete) {
      handleDeleteModule();
    }
    // eslint-disable-next-line
  }, [confirmDelete]);

  return (
    <div className="bg-gradient-to-br from-[#2c2c35] to-[#29292a] p-5 rounded-md shadow-lg font-Josefin hover:from-[#373739] hover:to-[#414144] text-dark-primary  ">
      {open && (
        <CustomModal
          isOpen={open}
          onClose={toggleModal}
          modalHeader="Edit Module"
        >
          <AddModule
            index={index}
            data={module}
            edit={true}
            closeModal={toggleModal}
          />
        </CustomModal>
      )}
      {confirmModal && (
        <CustomModal isOpen={confirmModal} onClose={toggleConfirmModal}>
          <ConfirmBox close={toggleConfirmModal} confirm={handleConfirmDelete} />
        </CustomModal>
      )}
      <div className="cursor-pointer flex justify-between">
        {edit && (
          <div className="flex gap-4 items-center">
            {" "}
            <FaEdit size={18} onClick={toggleModal} />{" "}
            <MdDeleteOutline onClick={toggleConfirmModal} size={20} />
          </div>
        )}
        {module?.title} <IoIosArrowDown onClick={toggleLesson} size={20} />
      </div>
      {lesson && (
        <>
          {lessons?.map((lesson) => (
            <LessonCard key={lesson.index} lesson={lesson} />
          ))}
          {<CourseContents index={index} />}
        </>
      )}
    </div>
  );
};

export default ModuleCard;
