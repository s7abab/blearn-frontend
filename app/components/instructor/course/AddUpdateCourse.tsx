"use client";
import React, { useEffect, useState } from "react";
import {
  useAddCourseMutation,
  useEditCourseMutation,
  useGetAllCategoryQuery,
} from "@/redux/features/course/courseApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  IAddCourse,
  ICourseDetails,
} from "@/@types/interfaces/course/course.interface";
import CourseForm from "./CourseForm";
import useFileUpload from "@/app/hooks/useS3Upload";

interface Props {
  course?: ICourseDetails;
  edit?: boolean;
}
const AddUpdateCourse = ({ course, edit }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const router = useRouter();

  const { loading, uploadFile } = useFileUpload();

  const [courseDetails, setCourseDetails] = useState<IAddCourse>({
    title: course?.title || "",
    description: course?.description || "",
    price: course?.price || 0,
    discountPrice: course?.discountPrice || 0,
    category: course?.category || "",
    thumbnail: course?.thumbnail || "",
    demoUrl: course?.demoUrl || "",
  });
  const [AddCourse, { isSuccess }] = useAddCourseMutation();
  const [EditCourse, { isSuccess: edited }] = useEditCourseMutation();
  const { data: categoriesData } = useGetAllCategoryQuery({});

  const categories: ICategories[] = categoriesData?.categories;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCourseDetails({
      ...courseDetails,
      [name]: value,
    });
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value;
    setCourseDetails({
      ...courseDetails,
      category: selectedCategory,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setImage(e.target.files[0]);
    }
  };
  // upload image
  const handleImageUpload = async () => {
    try {
      const imageUrl = await uploadFile(image);
      if (imageUrl) {
        // Update the state using a callback function
        setCourseDetails((prevDetails) => ({
          ...prevDetails,
          thumbnail: imageUrl,
        }));
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setVideo(e.target.files[0]);
    }
  };
  // upload video
  const handleVideoUpload = async () => {
    try {
      const videoUrl = await uploadFile(video);
      if (videoUrl) {
        setCourseDetails({
          ...courseDetails,
          demoUrl: videoUrl,
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  // publish course
  const handlePublish = () => {
    AddCourse(courseDetails as ICourseDetails);
  };
  // edit course
  const handleEdit = async () => {
    await EditCourse({ ...courseDetails, _id: course?._id });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course published");
      router.push("/instructor/courses");
    }
    if (edited) {
      toast.success("Course Updated");
      router.push("/instructor/courses");
    }
    // eslint-disable-next-line
  }, [isSuccess, edited]);
  useEffect(() => {
    if (video) {
      handleVideoUpload();
    }
    //eslint-disable-next-line
  }, [video]);

  useEffect(() => {
    if (image) {
      handleImageUpload();
    }
    //eslint-disable-next-line
  }, [image]);
  return (
    <CourseForm
      categories={categories}
      courseDetails={courseDetails}
      edit={edit}
      handleCategoryChange={handleCategoryChange}
      handleEdit={handleEdit}
      handleImageChange={handleImageChange}
      uploading={loading}
      handleInputChange={handleInputChange}
      handlePublish={handlePublish}
      handleVideoChange={handleVideoChange}
    />
  );
};

export default AddUpdateCourse;
