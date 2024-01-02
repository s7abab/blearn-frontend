"use client";
import { styles } from "@/app/styles/style";
import React, {  useState } from "react";
import CustomModal from "../../common/modals/CustomModal";
import AddCategory from "./AddCategory";
import {
  useGetAllCategoryQuery,
  useUnListCategoryMutation,
} from "@/redux/features/course/courseApi";
import { MdEdit } from "react-icons/md";
import EditCategory from "./EditCategory";

const Category = () => {
  const [categoryId, setCategoryId] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { data } = useGetAllCategoryQuery({});
  const [unlist, { }] = useUnListCategoryMutation();
  const categories: ICategories[] = data?.categories;

  const openAddModal = (): void => {
    setAddModal(true);
  };
  const closeAddModal = (): void => {
    setAddModal(false);
  };
  const openEditModal = (categoryId:string): void => {
    setCategoryId(categoryId)
    setEditModal(true);
  };
  const closeEditModal = (): void => {
    setEditModal(false);
  };

  const handleUnlist = (categoryId: string) => {
    unlist({ categoryId });
  };

  return (
    <>
      {addModal && (
        <CustomModal isOpen={addModal} onClose={closeAddModal} modalHeader="Add Category">
          <AddCategory onClose={closeAddModal} />
        </CustomModal>
      )}
      {editModal && (
        <CustomModal isOpen={editModal} onClose={closeEditModal} modalHeader="Edit Category">
          <EditCategory onClose={closeEditModal} categoryId={categoryId} />
        </CustomModal>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <button onClick={openAddModal} className={`${styles.blue_btn} mt-5`}>
          Create Category
        </button>
        <table className="w-full text-sm text-left rtl:text-right text-gray-400 mt-5">
          <thead className="dark:bg-gradient-to-br dark:from-[#040e2c] dark:to-[#091336] dark:text-dark-primary bg-gray-300 shadow-2xl text-light-primary">
            <tr>
              <th scope="col" className="px-4 py-4 w-1/4">
                Si No
              </th>
              <th scope="col" className="px-4 py-3">
                Category Name
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {categories?.map((category, index) => (
              <tr key={index} className="bg-gray-100 dark:text-dark-primary bg-gradient-to-br dark:from-[#05081b] dark:to-[#050d2e] shadow-2xl ">
                <td className="py-3 px-4 lg:py-4 lg:px-6">{index + 1}</td>
                <td
                  onClick={()=>openEditModal(category._id)}
                  className="py-3 px-4 lg:py-4 lg:px-6 flex gap-3 cursor-pointer"
                >
                  {category.name}
                  <MdEdit />
                </td>
                <td
                  onClick={() => handleUnlist(category._id)}
                  className="py-3 px-4 lg:py-4 lg:px-6 cursor-pointer"
                >
                  {category.isListed ? "Unlist" : "List"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Category;
