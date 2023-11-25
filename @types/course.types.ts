export interface CourseDetails {
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