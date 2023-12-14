import { IEnrolledUser } from "./enrollment.interface";
import { IModule } from "./module.interface";
import { IReview } from "./review.interface";

export interface ICourseDetails {
  _id: any;
  instructorId?: string;
  title: string;
  category: any;
  description: string;
  thumbnail: string;
  demoUrl: string;
  price: number;
  discountPrice: number;
  revenue?: number;
  isBlock: boolean;
  reviews?: IReview[];
  modules: IModule[];
  duration: number;
  totalLessons: number;
  enrolledUsers: [IEnrolledUser];
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

export interface IPrice {
  price: number;
  discountPrice: number;
}

export interface ICourseDataForTable {
  _id: string;
  No: number;
  Time: string;
  Price: number;
  for: string;
}
