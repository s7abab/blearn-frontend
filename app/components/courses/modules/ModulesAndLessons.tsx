"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDeletModuleMutation } from "@/redux/features/course/courseApi";
import { useDispatch, useSelector } from "react-redux";
import LessonCard from "./LessonCard";
import { FaEdit } from "react-icons/fa";
import AddModule from "../../instructor/modules/AddModule";
import CustomModal from "../../common/modals/CustomModal";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmBox from "../../common/modals/ConfirmBox";
import { setActiveLessonId } from "@/redux/features/course/courseSlice";
import AddLesson from "../../instructor/lesson/AddLesson";
import { IModule } from "@/@types/interfaces/course/module.interface";
import { ILesson } from "@/@types/interfaces/course/lesson.interface";

type Props = {
  module: IModule;
  index: number;
  edit: boolean;
};

const ModulesAndLessons = ({ module, index, edit }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [lesson, setLesson] = useState<boolean>(false);
  const [editLesson, setEditLesson] = useState<boolean>(false);
  const [lessonData, setLessonData] = useState<any>({});
  const { course } = useSelector((state: any) => state.course);
  const [deleteModule, { isLoading }] = useDeletModuleMutation();
  const lessons: ILesson[] = module?.lessons as ILesson[];
  const dispatch = useDispatch();

  const courseId = course._id;
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

  const handleLesson = (lesson: ILesson) => {
    if (edit) {
      handleEditLesson(lesson);
    }
    handleLessonChange(lesson._id);
  };

  const handleLessonChange = (id: any) => {
    dispatch(setActiveLessonId(id));
  };

  const handleEditLesson = (lesson: ILesson) => {
    setLessonData({ ...lesson });
    setEditLesson(!editLesson);
  };
  return (
    <div className=" dark:bg-inherit p-5 rounded-md font-Poppins text-md dark:hover:from-[#373739] dark:hover:to-[#414144] dark:text-dark-primary bg-gray-400">
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
          <ConfirmBox
            close={toggleConfirmModal}
            confirm={handleConfirmDelete}
          />
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
        <h1 className="text-lg">{module?.title} </h1>{" "}
        <IoIosArrowDown onClick={toggleLesson} size={20} />
      </div>
      {lesson && (
        <>
          {lessons?.map((lesson, index) => (
            <div
              key={index}
              onClick={() => {
                handleLesson(lesson);
              }}
            >
              <LessonCard lesson={lesson} index={index} />
            </div>
          ))}
          {edit && <>{<AddLesson edit={false} index={index} />}</>}
          {editLesson && (
            <>{<AddLesson lesson={lessonData} edit={true} index={index} />} </>
          )}
        </>
      )}
    </div>
  );
};

export default ModulesAndLessons;
