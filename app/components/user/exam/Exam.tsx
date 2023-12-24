import { styles } from "@/app/styles/style";
import { useState } from "react";
import QuestionsCard from "./ExamValuation";
import Loader from "../../common/spinners/Loader";

interface Props {
  isLoading: boolean;
  questions:any
}

const Exam = ({isLoading,questions}:Props) => {
  const [open, setOpen] = useState<boolean>(false);

  if (isLoading) return <Loader />;
  return (
    <div className="rounded-lg shadow-md p-8 max-w-md w-full">
      {open ? (
        <QuestionsCard questions={questions} />
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Exam Details:</h2>
            <p className="text-gray-400">
              This exam consists of 10 questions. To pass and obtain a
              certificate, a minimum score of 7 out of 10 is required. If you
              dont achieve the passing score, you will need to reattempt the
              exam.
            </p>
          </div>
          <div className="text-center">
            <button onClick={() => setOpen(true)} className={styles.primary}>
              Start Exam
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Exam;
