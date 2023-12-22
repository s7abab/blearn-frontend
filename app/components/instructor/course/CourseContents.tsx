"use client";
import { styles } from "@/app/styles/style";
import { useState } from "react";
import Modules from "../modules/Modules";
import Questions from "../valuation/Questions";

const CourseContents = () => {
  const [tab, setTab] = useState<string>("modules");
  return (
    <>
      <div className="flex gap-5 mt-5">
        <button
          onClick={() => setTab("modules")}
          className={`${styles.blue_btn} w-1/2`}
        >
          Modules
        </button>
        <button
          onClick={() => setTab("valuation")}
          className={`${styles.blue_btn} w-1/2`}
        >
          Valuation
        </button>
      </div>
      <div>
        {tab === "modules" && <Modules /> }
        {tab === "valuation" && <Questions />}
      </div>
    </>
  );
};

export default CourseContents;
