import LessonCard from "./LessonCard";
import { ILesson } from "@/@types/interfaces/course/lesson.interface";
import { useDispatch, useSelector } from "react-redux";
import { setActiveLessonId } from "@/redux/features/course/courseSlice";
import { useEffect, useState } from "react";
import LessonCrud from "../../instructor/lesson/LessonCrud";
import { useDeleteLessonMutation } from "@/redux/features/course/courseApi";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

interface LessonComponentProps {
  lessons: ILesson[];
  edit: boolean;
  moduleId: string;
}

const LessonsComponent = ({
  lessons,
  edit,
  moduleId,
}: LessonComponentProps) => {
  const [editLesson, setEditLesson] = useState<boolean>(false);
  const [lessonData, setLessonData] = useState<any>({});
  const [lessonIndex, setLessonIndex] = useState<number>(0);

  const { course } = useSelector((state: any) => state.course);
  const dispatch = useDispatch();
  const [deleteLesson, { isSuccess, error, isLoading }] =
    useDeleteLessonMutation();

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

  // delete lesson
  const handleDelete = (index: number) => {
    deleteLesson({ index, courseId: course._id, moduleId });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Lesson deleted");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
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
            {edit && (
              <button
                className="p-2 flex gap-1 items-center"
                disabled={isLoading}
                onClick={() => handleDelete(idx)}
              >
                <MdDelete />
                Delete
              </button>
            )}
        </div>
      ))}
      {edit && <LessonCrud edit={false} moduleId={moduleId} />}
      {editLesson && (
        <LessonCrud
          lesson={lessonData}
          lessonIndex={lessonIndex}
          edit={true}
          moduleId={moduleId}
        />
      )}
    </>
  );
};

export default LessonsComponent;
