"use client";
import { IQuestion } from "@/@types/interfaces/valuation/valuation.interface";
import {
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from "@/redux/features/valuation/valuationApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface Props {
  handleOpen: () => void;
  edit: boolean;
  questionData?: IQuestion | null;
  index?: number;
}
const QuestionForm = ({ handleOpen, edit, questionData, index }: Props) => {
  const [question, setQuestion] = useState(questionData?.question || "");
  const [options, setOptions] = useState({
    optionA: questionData?.optionA || "",
    optionB: questionData?.optionB || "",
    optionC: questionData?.optionC || "",
    optionD: questionData?.optionD || "",
  });
  const [correctAnswer, setCorrectAnswer] = useState(
    questionData?.correctAnswer || ""
  );
  const { course } = useSelector((state: any) => state.course);
  const [createQuestion, { data, error, isSuccess }] =
    useCreateQuestionMutation();
  const [updateQuestion, { data: updateData }] = useUpdateQuestionMutation();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "question") {
      setQuestion(value);
    } else if (name === "correctAnswer") {
      setCorrectAnswer(value);
    } else {
      setOptions({ ...options, [name]: value });
    }
  };
  const handleSubmit = () => {
    const data: IQuestion = {
      question,
      ...options,
      correctAnswer,
    };
    if (edit) {
      updateQuestion({ courseId: course._id, index, data });
    } else {
      createQuestion({ courseId: course._id, data });
    }
    if (edit) {
      toast.success("Question updated successfully");
      handleOpen();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Question created successfully");
      handleOpen();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
      handleOpen();
    }
    // eslint-disable-next-line
  }, [error, isSuccess]);
  return (
    <div className="flex flex-col p-5">
      <label htmlFor="question">Question</label>
      <input
        type="text"
        name="question"
        className="p-2 rounded-md"
        placeholder="Enter your question here"
        value={question}
        onChange={handleInputChange}
      />
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center">
          <input
            type="radio"
            name="correctAnswer"
            value="A"
            checked={correctAnswer === "A"}
            onChange={handleInputChange}
            className="mr-2"
          />
          <input
            type="text"
            name="optionA"
            className="p-2 rounded-md"
            placeholder="Enter option A"
            value={options.optionA}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="correctAnswer"
            value="B"
            checked={correctAnswer === "B"}
            onChange={handleInputChange}
            className="mr-2"
          />
          <input
            type="text"
            name="optionB"
            className="p-2 rounded-md"
            placeholder="Enter option B"
            value={options.optionB}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="correctAnswer"
            value="C"
            checked={correctAnswer === "C"}
            onChange={handleInputChange}
            className="mr-2"
          />
          <input
            type="text"
            name="optionC"
            className="p-2 rounded-md"
            placeholder="Enter option C"
            value={options.optionC}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="correctAnswer"
            value="D"
            checked={correctAnswer === "D"}
            onChange={handleInputChange}
            className="mr-2"
          />
          <input
            type="text"
            name="optionD"
            className="p-2 rounded-md"
            placeholder="Enter option D"
            value={options.optionD}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 rounded-md p-2 bg-gray-800 text-white"
      >
        Submit
      </button>
    </div>
  );
};

export default QuestionForm;
