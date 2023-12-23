import { styles } from "@/app/styles/style";
import { FaStar } from "react-icons/fa";

const FeedbackInput = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex items-center gap-3">
        <div className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-gray-100">
          Photo
        </div>
        <h1 className="text-xl font-bold">Give a Rating *</h1>
      </div>
      <div className="flex items-center mx-10">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="text-yellow-400 text-2xl" />
        ))}
      </div>
      <textarea
        className="w-full h-32 border  rounded p-2 bg-inherit mt-3"
        placeholder="Enter your feedback..."
      />
      <div className="flex justify-end mt-3">
      <button className={`${styles.blue_btn} w-[100px]`}>Submit</button>
      </div>
    </div>
  );
};

export default FeedbackInput;
