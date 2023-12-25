"use client";
import { styles } from "@/app/styles/style";
import { useState } from "react";
import CustomModal from "../../common/modals/CustomModal";
import CustomInput from "../../common/CustomInput";
import { useGetCoursesForInstructorQuery } from "@/redux/features/course/courseApi";
import { ICourseDetails } from "@/@types/interfaces/course/course.interface";

interface CommunityData {
  name: string;
  description: string;
  courseId: string;
}
const initialCommunityData: CommunityData = {
  name: "",
  description: "",
  courseId: ""
};
const CreateCommunity = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [communityData, setCommunityData] =
    useState<CommunityData>(initialCommunityData);

  const { data } = useGetCoursesForInstructorQuery({});
  const courses: ICourseDetails[] = data?.courses;

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommunityData({
      ...communityData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCommunityData(initialCommunityData);
  };

  const inputFields = [
    { name: "name", placeholder: "Community Name", type: "text" },
    { name: "description", placeholder: "Community Description", type: "text" },
  ];

  return (
    <div className="mt-5">
      <button onClick={handleOpen} className={styles.primary}>
        Create New Community
      </button>
      {open && (
        <CustomModal
          isOpen={open}
          onClose={handleOpen}
          modalHeader="Create Community"
        >
          <form>
            {inputFields.map((field) => (
              <div className="flex flex-col" key={field.name}>
                <CustomInput
                  type={field.type}
                  name={field.name}
                  value={communityData[field.name as keyof CommunityData]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  inputStyle="p-2 rounded-md mx-5 mt-5"
                />
              </div>
            ))}
            <div className="mt-5 flex justify-center">
              <select className="p-2 w-5/6 rounded-md  ">
                <option>Select Course</option>
                {courses?.map((course) => (
                  <option key={course._id}>{course.title}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-center">
              <button
                className={`${styles.secondary_Btn} w-full m-5`}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </CustomModal>
      )}
    </div>
  );
};

export default CreateCommunity;
