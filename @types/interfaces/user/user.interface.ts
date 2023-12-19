export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  isBlock:boolean
}

export interface IUserDataForTable {
  _id: string;
  Name: string;
  Email: string;
  role: string;
}

export interface IBankDetails {
  name: string;
  accountNumber: number;
  ifscCode: number;
} 