export interface ILesson {
  _id?: string;
  courseId: string;
  index?: number;
  type: string;
  title: string;
  url: string;
  duration: number;
}

export interface ILessonRequest extends ILesson {
  courseId: string;
  index: number;
}

export interface ILessonGetRequest {
  courseId: string;
  instructorId: string;
  index: any;
}

export interface ILessonProgressTrackData {
  courseId: string;
  progress: number;
  lessonId: string;
}
