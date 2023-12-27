import LessonCard from "./LessonCard";
import { ILesson } from "@/@types/interfaces/course/lesson.interface";
import { useDispatch } from "react-redux";
import { setActiveLessonId } from "@/redux/features/course/courseSlice";
import { useState } from "react";
import LessonCrud from "../../instructor/lesson/LessonCrud";

interface LessonComponentProps {
  lessons: ILesson[];
  edit: boolean;
  index: number;
}

const LessonsComponent = ({ lessons, edit, index }: LessonComponentProps) => {
  const [editLesson, setEditLesson] = useState<boolean>(false);
  const [lessonData, setLessonData] = useState<any>({});
  const [lessonIndex, setLessonIndex] = useState<number>(0);
  const dispatch = useDispatch();

  const handleLesson = (lesson: ILesson, idx: number) => {
    if (edit) {
      handleEditLesson(lesson);
      setLessonIndex(idx);
    }
    handleLessonChange(lesson._id);
  };

  const handleLessonChange = (id: any) => {
    dispatch(setActiveLessonId(id));
  };

  const handleEditLesson = (lesson: ILesson) => {
    setLessonData({ ...lesson });
    setEditLesson(!editLesson);
  };
  return (
    <>
      {lessons?.map((lesson, idx) => (
        <div
          key={idx}
          onClick={() => {
            handleLesson(lesson, idx);
          }}
        >
          <LessonCard lesson={lesson} index={idx} />
        </div>
      ))}
      {edit && <LessonCrud edit={false} index={index} />}
      {editLesson && (
        <LessonCrud
          lesson={lessonData}
          lessonIndex={lessonIndex}
          edit={true}
          index={index}
        />
      )}
    </>
  );
};

export default LessonsComponent;
