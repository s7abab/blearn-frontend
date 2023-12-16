import { IAddCourse } from "@/@types/interfaces/course/course.interface";
import React from "react";
import SmallLoader from "../../common/spinners/SmallLoader";

type Props = {
  courseDetails: IAddCourse;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: ICategories[];
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  edit: boolean | undefined;
  handleEdit: () => Promise<void>;
  handlePublish: () => string | undefined;
};

const CourseForm = ({
  courseDetails,
  handleInputChange,
  handleCategoryChange,
  categories,
  handleImageChange,
  uploading,
  handleVideoChange,
  edit,
  handleEdit,
  handlePublish,
}: Props) => {
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
            {courseDetails.thumbnail.length !== 0 && (
              <span>✅ Image Added</span>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-lg font-Poppins ">Preview Video</h1>
          {uploading ? (
            <SmallLoader />
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
              {courseDetails.demoUrl.length !== 0 && (
                <span>✅ Video Added</span>
              )}
            </div>
          )}
        </div>
        <div className="mb-5">
          {edit ? (
            <button
              onClick={handleEdit}
              className="border rounded-lg p-2 w-full mt-5 bg-gray-500 hover:bg-gray-600 text-light-primary dark:bg-slate-600 dark:hover:bg-slate-800 dark:text-dark-primary"
            >
              EDIT COURSE
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="border rounded-lg p-2 w-full mt-5 bg-gray-500 hover:bg-gray-600 text-light-primary dark:bg-slate-600 dark:hover:bg-slate-800 dark:text-dark-primary"
            >
              PUBLISH COURSE
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseForm;
