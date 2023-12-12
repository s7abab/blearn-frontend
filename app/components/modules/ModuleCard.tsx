"use client";
import { IModule } from "@/@types/course/course.types";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDeletModuleMutation } from "@/redux/features/course/courseApi";
import { useDispatch, useSelector } from "react-redux";
import { ILesson } from "@/@types/course/lesson.types";
import LessonCard from "./LessonCard";
import { FaEdit } from "react-icons/fa";
import AddModule from "../instructor/AddModule";
import CustomModal from "../modals/CustomModal";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmBox from "../modals/ConfirmBox";
import { setActiveLessonId } from "@/redux/features/course/courseSlice";
import AddLesson from "../instructor/AddLesson";

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
  const [editLesson, setEditLesson] = useState<boolean>(false);
  const [lessonData, setLessonData] = useState<any>({});

  const { courseId } = useSelector((state: any) => state.course);
  const [deleteModule, { isLoading }] = useDeletModuleMutation();
  const lessons: ILesson[] = module?.lessons;
  const dispatch = useDispatch();

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

  const handleLessonChange = (id: any) => {
    dispatch(setActiveLessonId(id));
  };

  const handleEditLesson = (lesson: ILesson) => {
    setLessonData({ ...lesson });
    setEditLesson(!editLesson);
  };
  return (
    <div className=" bg-inherit p-5 rounded-md font-Poppins text-md hover:from-[#373739] hover:to-[#414144] text-dark-primary  ">
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
              key={lesson.lessonNo}
              onClick={() => {
                handleLessonChange(lesson._id), handleEditLesson(lesson);
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

export default ModuleCard;
