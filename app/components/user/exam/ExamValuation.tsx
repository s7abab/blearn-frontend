import { useAddCompletedUserMutation } from "@/redux/features/valuation/valuationApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export interface IQuestion {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

interface Props {
  questions: IQuestion[];
}

const ExamValuation: React.FC<Props> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const [addCompletedUser] = useAddCompletedUserMutation();
  const { course } = useSelector((state: any) => state.course);
  const currentQuestion = questions[currentQuestionIndex];
  const handleNextQuestion = () => {
    if (selectedAnswer !== "") {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer("");
      if (currentQuestionIndex === questions.length - 1) {
        if (correctAnswers > 6) {
          addCompletedUser(course._id);
        }
        setShowResult(true);
      }
    } else {
      toast.error(
        "Please select an answer before moving to the next question."
      );
    }
  };

  const handleAnswerSelection = (option: string) => {
    setSelectedAnswer(option);
    checkAnswer(option);
  };

  const checkAnswer = (option: string) => {
    if (option === currentQuestion.correctAnswer) {
      setCorrectAnswers((prevCount) => prevCount + 1);
    }
  };
  console.log(correctAnswers);
  const calculateScore = () => {
    return Math.floor((correctAnswers / questions.length) * 100);
  };

  const getResultMessage = () => {
    const scorePercentage = calculateScore();
    return scorePercentage >= 70
      ? "Congratulations! You passed."
      : "Sorry, you failed.";
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded shadow-lg">
      {showResult ? (
        <div>
          <h3 className="text-2xl font-bold mb-4">Result</h3>
          <p>You have completed the exam. You scored {calculateScore()}%.</p>
          <p>{getResultMessage()}</p>
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-bold mb-4">
            {currentQuestion.question}
          </h3>
          <div className="space-y-2">
            {/* Radio inputs for all options */}
            <label className="flex items-center">
              <input
                type="radio"
                value={currentQuestion.optionA}
                checked={selectedAnswer === "A"}
                onChange={() => handleAnswerSelection("A")}
              />
              <span className="ml-2">{currentQuestion.optionA}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value={currentQuestion.optionB}
                checked={selectedAnswer === "B"}
                onChange={() => handleAnswerSelection("B")}
              />
              <span className="ml-2">{currentQuestion.optionB}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value={currentQuestion.optionC}
                checked={selectedAnswer === "C"}
                onChange={() => handleAnswerSelection("C")}
              />
              <span className="ml-2">{currentQuestion.optionC}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value={currentQuestion.optionD}
                checked={selectedAnswer === "D"}
                onChange={() => handleAnswerSelection("D")}
              />
              <span className="ml-2">{currentQuestion.optionD}</span>
            </label>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </>
      )}
    </div>
  );
};

export default ExamValuation;
