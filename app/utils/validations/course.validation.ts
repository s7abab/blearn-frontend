import toast from "react-hot-toast";
import validator from "validator";

export const validateCourseName = (name: string) => {
  if (validator.isEmpty(name)) {
    toast.error("Course title is required", {
      position: "bottom-center",
    });
    return false;
  }
  if (name.trim().length <= 2) {
    toast.error("Course name should contain more than two letters");
    return false;
  }

  return true;
};
export const validatePrice = (price: number, discountPrice: number) => {
  if (price < 1) {
    toast.error("Price should greaterthan 0", {
      position: "bottom-center",
    });
    return false;
  }
  if (price > 200) {
    toast.error("Price should greaterthan 200$", {
      position: "bottom-center",
    });
    return false;
  }
  if (discountPrice < 1) {
    toast.error("Price should greaterthan 0", {
      position: "bottom-center",
    });
    return false;
  }

  const dPrice = discountPrice.toString();
  const aPrice = price.toString();
  if (parseFloat(dPrice) > parseFloat(aPrice)) {
    toast.error("Discount price should be less than the actual price", {
      position: "bottom-center",
    });
    return false;
  }

  return true;
};

export const validateDiscription = (description: string) => {
  if (description.trim() === "") {
    toast.error("Course description is required", {
      position: "bottom-center",
    });
    return false;
  }
  if (description.trim().length <= 2) {
    toast.error("Course description should contain more than two letters", {
      position: "bottom-center",
    });
    return false;
  }

  return true;
};
