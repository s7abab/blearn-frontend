"use client";
import {
  useAddCourseMutation,
  useEditCourseMutation,
  useGetAllCategoryQuery,
} from "@/redux/features/course/courseApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  validateCourseName,
  validateDiscription,
  validatePrice,
} from "@/app/utils/validations/course.validation";
import { useRouter } from "next/navigation";
import uploadVideo from "@/app/utils/video-upload";
import uploadImage from "@/app/utils/upload-image";
import {
  IAddCourse,
  ICourseDetails,
} from "@/@types/interfaces/course/course.interface";
import CourseForm from "./CourseForm";

type Props = {
  course?: ICourseDetails;
  edit?: boolean;
};
const AddUpdateCourse = ({ course, edit }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
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
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetAllCategoryQuery({});

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

  const handleImageUpload = async () => {
    try {
      const imageUrl = await uploadImage(image);
      if (imageUrl) {
        setCourseDetails({
          ...courseDetails,
          thumbnail: imageUrl,
        });
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleVideoUpload = async () => {
    try {
      setUploading(true);
      const videoUrl = await uploadVideo(video);
      if (videoUrl) {
        setCourseDetails({
          ...courseDetails,
          demoUrl: videoUrl,
        });
      }
      setUploading(false);
    } catch (error: any) {
      setUploading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setVideo(e.target.files[0]);
    }
  };

  const handlePublish = () => {
    validateCourseName(courseDetails.title);
    validatePrice({
      price: courseDetails.price,
      discountPrice: courseDetails.discountPrice,
    });
    validateDiscription(courseDetails.description);
    if (!courseDetails.category) {
      return toast.error("Category is required");
    }
    if (!courseDetails.demoUrl) {
      return toast.error("Video is required");
    }
    if (!courseDetails.thumbnail) {
      return toast.error("Image is required");
    }
    AddCourse(courseDetails as ICourseDetails);
  };

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
      uploading={uploading}
      handleInputChange={handleInputChange}
      handlePublish={handlePublish}
      handleVideoChange={handleVideoChange}
    />
  );
};

export default AddUpdateCourse;
