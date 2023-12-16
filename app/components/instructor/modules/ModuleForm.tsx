import { IAddModule } from "@/@types/interfaces/course/module.interface";
import { styles } from "@/app/styles/style";
import React from "react";

type Props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  moduleData: IAddModule;
  edit?: boolean;
  handleEditModule?: () => void;
  handleAddModule?: () => void;
};

const ModuleForm = ({
  handleChange,
  moduleData,
  edit,
  handleEditModule,
  handleAddModule
}: Props) => {
  return (
    <div className="p-6 ">
      <p className="font-Poppins">Title</p>{" "}
      <input
        onChange={handleChange}
        value={moduleData.title}
        name="title"
        className="p-2 w-full rounded-md mb-2"
        type="text"
      />
      {edit ? (
        <button
          onClick={handleEditModule}
          className={`${styles.secondary_Btn} w-full mt-5`}
        >
          Edit
        </button>
      ) : (
        <button
          onClick={handleAddModule}
          className={`${styles.secondary_Btn} w-full mt-5`}
        >
          Add
        </button>
      )}
    </div>
  );
};

export default ModuleForm;
