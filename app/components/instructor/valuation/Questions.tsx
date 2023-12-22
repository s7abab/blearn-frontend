"use client";
import { styles } from "@/app/styles/style";
import { useState } from "react";
import CustomModal from "../../common/modals/CustomModal";
import QuestionForm from "./QuestionForm";
import {
  useCreateExamMutation,
  useDeleteQuestionMutation,
  useGetExamQuery,
} from "@/redux/features/valuation/valuationApi";
import { useSelector } from "react-redux";
import { IQuestion } from "@/@types/interfaces/valuation/valuation.interface";
import QuestionsCard from "./QuestionsCard";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const Questions = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const [index, setIndex] = useState<number>(0);

  const { course } = useSelector((state: any) => state.course);
  const { data: courseData } = useGetExamQuery(course._id);
  const questions: IQuestion[] = courseData?.exam?.questions;
  const [deleteQuestion, {}] = useDeleteQuestionMutation();
  const [createExam, {}] = useCreateExamMutation();

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleCreateExam = () => {
    createExam({ courseId: course._id, totalQuestions: 10, passMark: 7 });
    toast.success("Exam created successfully");
  };

  const handleSetQuestion = (question: IQuestion, index: number) => {
    setQuestion(question);
    setIndex(index);
    handleEdit();
  };

  const handleDeleteQuestion = (index: number) => {
    deleteQuestion({ courseId: course._id, index });
  };

  return (
    <>
      <div className={`${styles.title}`}>Questions</div>
      {open && (
        <>
          <CustomModal
            modalHeader="Add Question"
            isOpen={open}
            onClose={handleOpen}
          >
            <QuestionForm edit={false} handleOpen={handleOpen} />
          </CustomModal>
        </>
      )}
      {edit && (
        <CustomModal
          isOpen={edit}
          onClose={handleEdit}
          modalHeader="Edit Question"
        >
          <QuestionForm
            questionData={question}
            handleOpen={handleEdit}
            edit={true}
            index={index}
          />
        </CustomModal>
      )}
      <div>
        <div className="flex items-center gap-5 font-Poppins text-red-700">
          <button
            onClick={courseData ? handleOpen : handleCreateExam}
            className="bg-gradient-to-br from-[#0c214d] to-[#051536] p-3 rounded-md shadow-lg font-Josefin hover:from-[#11295d] hover:to-[#0c214d] text-dark-primary  cursor-pointer border-r-2 border-r-gray-100"
          >
            {courseData ? " Add Question" : "Create exam"}
          </button>
          {10 - (courseData?.exam?.questions?.length || 0) > 0 && (
            <h1>{`Add ${
              10 - (courseData?.exam?.questions?.length || 0)
            } More Questions!`}</h1>
          )}
        </div>
        <>
          {questions?.map((question, index) => (
            <div key={index} className="flex justify-between mt-4 item">
              <div onClick={() => handleSetQuestion(question, index)}>
                <QuestionsCard question={question} />
              </div>
              <div
                onClick={() => handleDeleteQuestion(index)}
                className="cursor-pointer"
              >
                <MdDelete />
              </div>
            </div>
          ))}
        </>
      </div>
    </>
  );
};

export default Questions;
