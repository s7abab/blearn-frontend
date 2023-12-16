import { ILesson } from "./lesson.interface";

export interface IModule {
  _id:string;
  courseId:string;
  title: string;
  lessons: ILesson[];
}
export interface IAddModule {
  courseId:string;
  title: string;
}

export interface IModuleDeleteRequest {
  courseId: string;
  instructorId: string;
  index: number;
}
export interface IModuleRequest extends IModuleDeleteRequest {
  title: string;
}
