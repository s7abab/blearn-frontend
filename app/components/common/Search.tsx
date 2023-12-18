"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "@/redux/features/course/courseSlice";

interface Props {
  inputStyle: string;
  placeholder: string;
}

const Search = ({ inputStyle, placeholder }: Props) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: any) => state.course.searchTerm);

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    dispatch(setSearchTerm(newSearchTerm));
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTerm}
        placeholder={placeholder}
        className={inputStyle}
      />
    </div>
  );
};

export default Search;
