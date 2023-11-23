import { IDiscription, IName, IPrice } from "@/@types/course.types";
import toast from "react-hot-toast";

export const validateCourseName = ({ name }: IName) => {
  if (name.trim() === "") {
    toast.error("Course name is required");
    return false;
  }
  if (name.trim().length <= 2) {
    toast.error("Course name should contain more than two letters");
    return false;
  }

  return true;
};
export const validatePrice = ({ price, discountPrice }: IPrice) => {
  if (price < 1) {
    toast.error("Price should greaterthan 0");
    return false;
  }
  if (discountPrice < 1) {
    toast.error("Price should greaterthan 0");
    return false;
  }

  const dPrice = discountPrice.toString();
  const aPrice = price.toString()
  if (parseFloat(dPrice) > parseFloat(aPrice)) {
    toast.error("Discount price should be less than the actual price");
    return false;
  }

  return true;
};

export const validateDiscription = ({ discription }: IDiscription) => {
  if (discription.trim() === "") {
    toast.error("Course discription is required");
    return false;
  }
  if (discription.trim().length <= 2) {
    toast.error("Course discription should contain more than two letters");
    return false;
  }

  return true;
};
