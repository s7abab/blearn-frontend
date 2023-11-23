import toast from "react-hot-toast";

interface IName {
  name: string;
}
export const validateCategoryName = ({ name }: IName) => {
  if (name.trim() === "") {
    toast.error("Category name is required");
    return false;
  }
  if (/\d/.test(name)) {
    toast.error("Category name should not contain numbers");
    return false;
  }

  if (name.trim().length <= 2) {
    toast.error("Category name should contain more than two letters");
    return false;
  }

  return true;
};
