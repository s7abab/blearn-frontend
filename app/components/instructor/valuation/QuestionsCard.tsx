import { IQuestion } from "@/@types/interfaces/valuation/valuation.interface";
interface Props {
  question: IQuestion;
}

const QuestionsCard = ({ question }: Props) => {
  return (
    <div className="p-4 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-lg">{question?.question}</div>
      </div>
    </div>
  );
};

export default QuestionsCard;
