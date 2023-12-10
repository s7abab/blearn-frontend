export interface ILesson {
  _id?: string;
  courseId: string;
  index?: number;
  type: string;
  title: string;
  url: string;
  duration: number;
}
