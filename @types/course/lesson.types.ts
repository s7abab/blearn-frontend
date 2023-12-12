export interface ILessonAdd {
  _id?: string;
  courseId: string;
  index?: number;
  type: string;
  title: string;
  url: string;
  duration: number;
}
export interface ILesson extends ILessonAdd {
  lessonNo: number;
}

export interface ILessonProgressTrackData {
  courseId: string;
  moduleId: string | undefined;
  lessonId: string | undefined;
  progress: number;
}
