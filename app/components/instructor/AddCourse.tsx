"use client";
import {
  useAddCourseMutation,
  useGetAllCategoryQuery,
} from "@/redux/features/course/courseApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Uploading from "../spinners/SmallLoader";
import {
  validateCourseName,
  validateDiscription,
  validatePrice,
} from "@/app/utils/validations/course.validation";
import { IAddCourse, ICourseDetails } from "@/@types/course/course.types";
import { redirect } from "next/navigation";
import uploadVideo from "@/app/utils/video-upload";
import uploadImage from "@/app/utils/upload-image";

const AddCourse = () => {
  const [AddCourse, { isSuccess }] = useAddCourseMutation();
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetAllCategoryQuery({});
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const categories: ICategories[] = categoriesData?.categories;
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course published");
      redirect("/instructor/courses");
    }
    // eslint-disable-next-line
  }, [isSuccess]);

  const [courseDetails, setCourseDetails] = useState<IAddCourse>({
    title: "",
    description: "",
    price: 0,
    discountPrice: 0,
    category: "",
    thumbnail: "",
    demoUrl: "",
  });
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

  useEffect(() => {
    if (image) {
      handleImageUpload();
    }
    //eslint-disable-next-line
  }, [image]);

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

  useEffect(() => {
    if (video) {
      handleVideoUpload();
    }
    //eslint-disable-next-line
  }, [video]);

  const handlePublish = () => {
    validateCourseName({ name: courseDetails.title });
    validatePrice({
      price: courseDetails.price,
      discountPrice: courseDetails.discountPrice,
    });
    validateDiscription({ discription: courseDetails.description });
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
  return (
    <>
      <div className="mt-5">
        <h1 className="text-3xl font-semibold mb-4 ">Course Details</h1>
        <div className="mb-4">
          <label htmlFor="title" className="text-lg font-Poppins">
            Title
          </label>
          <input
            required
            type="text"
            name="title"
            value={courseDetails.title}
            onChange={handleInputChange}
            placeholder="Course Title"
            className="border rounded-lg p-2 w-full dark:bg-gray-900 bg-gray-100"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="text-lg font-Poppins">
            Description
          </label>
          <textarea
            required
            name="description"
            value={courseDetails.description}
            onChange={handleInputChange}
            placeholder="Course Description"
            className="border rounded-lg p-2 h-28 resize-none w-full dark:bg-gray-900"
          ></textarea>
        </div>
        <div className="flex">
          <div className="mb-3 ">
            <label htmlFor="price" className="text-lg font-semibold">
              Price
            </label>
            <input
              required
              type="number"
              name="price"
              value={courseDetails.price}
              onChange={handleInputChange}
              placeholder="Course Price"
              className="border rounded-lg p-2 w-full dark:bg-gray-900"
            />
          </div>
          <div className="mb-3 mx-10">
            <label htmlFor="discountPrice" className="text-lg font-semibold">
              Discount Price
            </label>
            <input
              required
              type="number"
              name="discountPrice"
              value={courseDetails.discountPrice}
              onChange={handleInputChange}
              placeholder="Discounted Price"
              className="border rounded-lg p-2 w-full dark:bg-gray-900"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="text-lg font-semibold block">
            Category
          </label>
          <select
            required
            className="border rounded-lg p-2 w-full dark:bg-gray-900"
            value={courseDetails.category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {categories?.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <h1 className="text-lg font-Poppins ">Course Thumbnail</h1>
          <div>
            <input
              required
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded-lg p-2 w-full"
            />
            {courseDetails.thumbnail.length!==0 && <span>✅ Image Added</span>}
          </div>
        </div>
        <div>
          <h1 className="text-lg font-Poppins ">Preview Video</h1>
          {uploading ? (
            <Uploading />
          ) : (
            <div>
              <input
                required
                type="file"
                id="videoUpload"
                accept="video/*"
                onChange={handleVideoChange}
                className="border rounded-lg p-2 w-full"
              />
              {courseDetails.demoUrl.length!==0 && <span>✅ Video Added</span>}
            </div>
          )}
        </div>
        <div className="mb-5">
          <button
            onClick={handlePublish}
            className="border rounded-lg p-2 w-full mt-5 bg-gray-500 hover:bg-gray-600 text-light-primary dark:bg-slate-600 dark:hover:bg-slate-800 dark:text-dark-primary"
          >
            PUBLISH COURSE
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
