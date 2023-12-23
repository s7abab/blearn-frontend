import { ILesson } from "@/@types/interfaces/course/lesson.interface";
import VideoPlayer from "@/app/components/video/VideoPlayer";
import Link from "next/link";
import { IoIosDocument } from "react-icons/io";
import LessonOverview from "../LessonOverview";
import { styles } from "@/app/styles/style";

type Props = {
  lessons: ILesson[];
  lessonCount: number;
  handleProgress: (state: { played: number }) => void;
  handlePrev: () => void;
  handleNext: () => void;
  totalLessons: number;
  activeLesson: number;
  currentLesson: ILesson;
};
const OngoingLesson = ({
  lessons,
  lessonCount,
  handleProgress,
  handlePrev,
  handleNext,
  totalLessons,
  activeLesson,
  currentLesson,
}: Props) => {
  return (
    <div className="md:w-2/3 rounded-md p-5">
      {lessons?.[lessonCount]?.type === "video" ? (
        <VideoPlayer
          handleProgress={handleProgress}
          url={lessons[lessonCount]?.url}
          height="400px"
        />
      ) : (
        <div className="h-[400px] w-full flex justify-center items-center">
          <IoIosDocument size={100} />
          {lessons?.[lessonCount]?.url && (
            <Link
              href={lessons?.[lessonCount]?.url}
              className="font-Poppins text-xl font-semibold"
            >
              Open Document
            </Link>
          )}
        </div>
      )}
      <div className="flex justify-between mt-2">
        <button
          className={`${styles.blue_btn} ${
            lessonCount > 0 ? "" : "cursor-not-allowed"
          }`}
          onClick={() => {
            handlePrev();
          }}
        >
          Prev Lesson
        </button>
        <button
          className={`${styles.blue_btn} ${
            lessonCount > totalLessons - 2 ? "cursor-not-allowed" : ""
          }`}
          onClick={() => {
            handleNext();
          }}
          disabled={activeLesson > totalLessons - 2}
        >
          Next Lesson
        </button>
      </div>
      <div className="mt-4">
        <h1 className="font-Poppins text-xl font-semibold">
          {currentLesson?.title}
        </h1>
      </div>
      <div>
        <LessonOverview />
      </div>
    </div>
  );
};

export default OngoingLesson;
