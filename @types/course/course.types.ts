import { ILesson } from "./lesson.types";

export interface ICourseDetails {
  _id: string;
  instructorId: string;
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  category: string;
  thumbnail: string;
  demoUrl: string;
  enrolls: string[];
  level: number;
}
export interface IAddCourse {
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  category: string;
  thumbnail: string;
  demoUrl: string;
}

export interface IName {
  name: string;
}

export interface IPrice {
  price: number;
  discountPrice: number;
}

export interface IDiscription {
  discription: string;
}

export interface ICourseDataForTable {
  _id: string;
  No: number;
  Time: string;
  Price: number;
  for: string;
}

export interface IModuleAdd {
  _id?: string;
  courseId: string;
  title: string;
}
export interface IModule extends IModuleAdd {
  lessons: ILesson[];
}
