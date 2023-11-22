"use client";
import { firebaseDB } from "@/app/utils/firebase";
import {
  useAddCourseMutation,
  useGetAllCategoryQuery,
} from "@/redux/features/course/courseApi";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import Uploading from "../spinners/Uploading";

interface CourseDetails {
  title: string;
  description: string;
  price: string;
  discountPrice: string;
  category: string;
  thumbnail: string;
  demoUrl: string;
}

const AddCourse = () => {
  const [AddCourse, { isSuccess, isLoading }] = useAddCourseMutation();
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetAllCategoryQuery({});
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const categories: ICategories[] = categoriesData?.categories;
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course published");
    }
  }, [isSuccess]);

  const [courseDetails, setCourseDetails] = useState<CourseDetails>({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
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
    const imgRef = ref(firebaseDB, `thumbnail/${v4()}`);
    if (image != null) {
      try {
        const snapshot = await uploadBytes(imgRef, image);
        const downloadURL = await getDownloadURL(imgRef);
        setCourseDetails({
          ...courseDetails,
          thumbnail: downloadURL,
        });
        console.log("Image uploaded successfully:", snapshot);
      } catch (error: any) {
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    if (image) {
      handleImageUpload();
    }
    //eslint-disable-next-line
  }, [image]);

  const handleVideoUpload = async () => {
    setUploading(true);
    try {
      const videoRef = ref(firebaseDB, `videos/${v4()}`);
      if (video) {
        const snapshot = await uploadBytes(videoRef, video);
        const downloadURL = await getDownloadURL(videoRef);
        setCourseDetails((prevDetails) => ({
          ...prevDetails,
          demoUrl: downloadURL,
        }));
        setUploading(false);
        console.log("Video uploaded successfully:", snapshot);
      } else {
        console.error("No video file provided for upload.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
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
    AddCourse(courseDetails);
  };
  return (
    <>
      {uploading ? (
        <Uploading />
      ) : (
        <div>
          <h1 className="text-3xl font-semibold mb-4 ">Course Details</h1>
          <div className="mb-4">
            <label htmlFor="title" className="text-lg font-Poppins">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={courseDetails.title}
              onChange={handleInputChange}
              placeholder="Course Title"
              className="border rounded-lg p-2 w-full bg-gray-900"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="text-lg font-Poppins">
              Description
            </label>
            <textarea
              name="description"
              value={courseDetails.description}
              onChange={handleInputChange}
              placeholder="Course Description"
              className="border rounded-lg p-2 h-28 resize-none w-full bg-gray-900"
            ></textarea>
          </div>
          <div className="flex">
            <div className="mb-3 ">
              <label htmlFor="price" className="text-lg font-semibold">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={courseDetails.price}
                onChange={handleInputChange}
                placeholder="Course Price"
                className="border rounded-lg p-2 w-full bg-gray-900"
              />
            </div>
            <div className="mb-3 mx-10">
              <label htmlFor="discountPrice" className="text-lg font-semibold">
                Discount Price
              </label>
              <input
                type="number"
                name="discountPrice"
                value={courseDetails.discountPrice}
                onChange={handleInputChange}
                placeholder="Discounted Price"
                className="border rounded-lg p-2 w-full bg-gray-900"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="text-lg font-semibold block">
              Category
            </label>
            <select
              className="border rounded-lg p-2 w-full bg-gray-900"
              value={courseDetails.category}
              onChange={handleCategoryChange}
            >
              {categories?.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <h1 className="text-lg font-Poppins ">Course Thumbnail</h1>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <h1 className="text-lg font-Poppins ">Preview Video</h1>
            <input
              type="file"
              id="videoUpload"
              accept="video/*"
              onChange={handleVideoChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <button
              onClick={handlePublish}
              className="border rounded-lg p-2 w-full mt-5 bg-slate-600 hover:bg-slate-800"
            >
              PUBLISH COURSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCourse;
