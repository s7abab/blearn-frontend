"use client";

import { IQuestion } from "@/@types/interfaces/valuation/valuation.interface";
import {
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from "@/redux/features/valuation/valuationApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import CustomInput from "../../common/CustomInput";

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
// for showing success and error toast
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

  const inputFields = [
    { name: "question", placeholder: "Enter your question here", type: "text" },
    { name: "optionA", placeholder: "Enter option A", type: "text" },
    { name: "optionB", placeholder: "Enter option B", type: "text" },
    { name: "optionC", placeholder: "Enter option C", type: "text" },
    { name: "optionD", placeholder: "Enter option D", type: "text" },
  ];

  return (
    <div className="flex flex-col m-5 gap-3">
      {inputFields.map((field) => (
        <div className="flex items-center" key={field.name}>
          {field.name === "question" ? (
            <>
              <CustomInput
                type={field.type}
                name={field.name}
                value={question}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                inputStyle="w-full p-2 rounded-md mb-2"
              />
            </>
          ) : (
            <>
              <input
                type="radio"
                name="correctAnswer"
                value={field.name.slice(-1)}
                checked={correctAnswer === field.name.slice(-1)}
                onChange={handleInputChange}
                className="mr-2"
              />
              <CustomInput
                type={field.type}
                name={field.name}
                value={options[field.name as keyof typeof options]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                inputStyle="w-full p-2 rounded-md"
              />
            </>
          )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-2 rounded-md p-2 bg-gray-800 text-white"
      >
        Submit
      </button>
    </div>
  );
};

export default QuestionForm;
