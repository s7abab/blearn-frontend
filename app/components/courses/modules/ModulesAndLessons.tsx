"use client";
import { useState } from "react";
import ModuleComponent from "./ModuleComponent";
import LessonsComponent from "./LessonComponent";
import { IModule } from "@/@types/interfaces/course/module.interface";
import { ILesson } from "@/@types/interfaces/course/lesson.interface";

interface Props {
  module: IModule;
  index: number;
  edit: boolean;
}
const ModulesAndLessons = ({ module, index, edit }: Props) => {
  const [lesson, setLesson] = useState<boolean>(false);
  const lessons: ILesson[] = module?.lessons as ILesson[];

  return (
    <div className=" dark:bg-inherit p-5 rounded-md font-Poppins text-md dark:hover:from-[#373739] dark:hover:to-[#414144] dark:text-dark-primary bg-gray-400">
      {/* render modules */}
      <ModuleComponent
        module={module}
        edit={edit}
        lesson={lesson}
        setLesson={setLesson}
        index={index}
      />
      {/* render lessons */}
      {lesson && (
        <LessonsComponent lessons={lessons} edit={edit} index={index} />
      )}
    </div>
  );
};

export default ModulesAndLessons;
