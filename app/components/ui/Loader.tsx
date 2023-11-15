'use client'
import React,{useEffect} from "react";

type Props = {};

const Loader = (props: Props) => {

  return (
   <div className="flex justify-center items-center h-screen">
    <div className="w-40 bg-red-700 h-40"></div>
   </div>
  );
};

export default Loader;
