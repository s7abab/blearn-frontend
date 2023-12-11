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
