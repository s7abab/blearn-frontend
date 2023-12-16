import { motion } from "framer-motion";
import { DataState } from "./instructor/ApplicationForm";

type Props = {
  progress: number;
  currentData: any;
  data: DataState;
  handleOptionSelect: (optionValue: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  step: number;
};

const ValuationCard = ({
  progress,
  currentData,
  data,
  handleOptionSelect,
  handlePrev,
  handleNext,
  step,
}: Props) => {
  return (
    <div className="flex justify-center items-center min-h-screen shadow-md">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="800px:w-[800px] 400px:w-[420px] mx-auto p-10 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md"
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          className="bg-blue-600 h-2.5 rounded-full "
        ></motion.div>

        <h1 className="font-Poppins text-2xl font-semibold mb-3 mt-5">
          {currentData?.title}
        </h1>
        <p>{currentData?.desc}</p>
        <h1 className="mt-3 font-Poppins text-lg">{currentData?.qstn}</h1>
        <div className="flex flex-col gap-5 mt-3">
          {currentData?.ans.map((option:any, index:number) => (
            <div
              className={`flex gap-4 items-center cursor-pointer ${
                data[step + 1] === (Object.values(option)[0] as number)
                  ? ""
                  : ""
              }`}
              key={index}
              onClick={() =>
                handleOptionSelect(Object.values(option)[0] as number)
              }
            >
              <div className="rounded-full border-2 border-gray-400 w-5 h-5 flex items-center justify-center">
                {data?.[step + 1] === Object.values(option)[0] && (
                  <div className="rounded-full bg-blue-600 w-3 h-3" />
                )}
              </div>
              <label htmlFor={`ans${index}`}>{Object.values(option)[0] as number}</label>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-5">
          <button
            className="w-[100px] h-[35px] bg-gray-900 hover:bg-gray-800 rounded-md shadow-md outline-none"
            onClick={handlePrev}
          >
            Back{" "}
          </button>
          <button
            className="w-[100px] h-[35px] bg-gray-900 hover:bg-gray-800 rounded-md shadow-md outline-none"
            onClick={handleNext}
          >
            Next{" "}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ValuationCard;
