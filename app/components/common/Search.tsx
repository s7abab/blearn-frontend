"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "@/redux/features/course/courseSlice";
import { useDebounce } from "@/app/hooks/useDebounceHook";

interface Props {
  inputStyle: string;
  placeholder: string;
}

const Search = ({ inputStyle, placeholder }: Props) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: any) => state.course.searchTerm);

  const [inputValue, setInputValue] = useState<string>("");
  const debouncedSearchTerm = useDebounce(inputValue, 300);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleSearchTerm}
        placeholder={placeholder}
        className={inputStyle}
      />
    </div>
  );
};

export default Search;
