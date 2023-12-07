"use client";
import React, { useState } from "react";

type Props = {
  handleClick: (arg:string) => void;
};

const SwitchTab = ({handleClick}: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          onClick={() => handleClick("overview")}
          className="bg-gradient-to-br from-[#0c214d] to-[#051536] p-4 rounded-md shadow-lg font-Josefin hover:from-[#11295d] hover:to-[#0c214d] text-dark-primary  cursor-pointer"
        >
          Course Overview
        </div>
        <div
         onClick={() => handleClick("contents")}
         className="bg-gradient-to-br from-[#0c214d] to-[#051536] p-4 rounded-md shadow-lg font-Josefin hover:from-[#11295d] hover:to-[#0c214d] text-dark-primary  cursor-pointer">
          Course Contents
        </div>
        <div
        onClick={() => handleClick("edit")}
        className="bg-gradient-to-br from-[#0c214d] to-[#051536] p-4 rounded-md shadow-lg font-Josefin hover:from-[#11295d] hover:to-[#0c214d] text-dark-primary  cursor-pointer">
          Edit Course
        </div>
      </div>
    </div>
  );
};

export default SwitchTab;
