"use client";
import { styles } from "@/app/styles/style";
import React, { useEffect, useState } from "react";
import CustomModal from "../../modals/CustomModal";
import AddCategory from "./AddCategory";
import {
  useGetAllCategoryQuery,
  useUnListCategoryMutation,
} from "@/redux/features/course/courseApi";
import { MdEdit } from "react-icons/md";
import EditCategory from "./EditCategory";

type Props = {};

const Category = (props: Props) => {
  const [categoryId, setCategoryId] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { data, refetch } = useGetAllCategoryQuery({});
  const [unlist, { isSuccess: listSuccess }] = useUnListCategoryMutation();
  const categories: ICategories[] = data?.categories;

  const openAddModal = (): void => {
    setAddModal(true);
  };
  const closeAddModal = (): void => {
    setAddModal(false);
    refetch();
  };
  const openEditModal = (categoryId:string): void => {
    setCategoryId(categoryId)
    setEditModal(true);
  };
  const closeEditModal = (): void => {
    setEditModal(false);
    refetch();
  };

  const handleUnlist = (categoryId: string) => {
    unlist({ categoryId });
  };
  useEffect(() => {
    if (listSuccess) {
      refetch();
    }
  }, [listSuccess, refetch]);

  return (
    <>
      {addModal && (
        <CustomModal isOpen={addModal} onClose={closeAddModal}>
          <AddCategory onClose={closeAddModal} />
        </CustomModal>
      )}
      {editModal && (
        <CustomModal isOpen={editModal} onClose={closeEditModal}>
          <EditCategory onClose={closeEditModal} categoryId={categoryId} />
        </CustomModal>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <button onClick={openAddModal} className={`${styles.primary} mt-5`}>
          Create Category
        </button>
        <table className="w-full text-sm text-left rtl:text-right text-gray-400 mt-5">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3 w-1/4">
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
          <tbody>
            {categories?.map((category, index) => (
              <tr key={index} className="bg-gray-800">
                <td className="px-4 py-4">{index + 1}</td>
                <td
                  onClick={()=>openEditModal(category._id)}
                  className="px-4 py-4 flex gap-3 cursor-pointer"
                >
                  {category.name}
                  <MdEdit />
                </td>
                <td
                  onClick={() => handleUnlist(category._id)}
                  className="px-4 py-4 cursor-pointer"
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
