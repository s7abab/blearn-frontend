
export interface IEnroll {
    userId: string;
    courseId: string;
    price?: number;
    payment_status?: string;
  }
  
  export interface IEnrolledUser {
    userId: string;
    progress: number;
    completedLessons:string[]
  }
  
  export interface ICreateEnrollment {
    courseId: string;
    price: number;
  }
  