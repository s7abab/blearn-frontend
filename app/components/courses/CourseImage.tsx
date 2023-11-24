import Image from "next/image";
import React from "react";

type Props = {
    imgUrl:string
};

const CourseImage = ({imgUrl}: Props) => {
  return <Image src={imgUrl} layout="fill" objectFit="cover" alt="Course"  />;
};

export default CourseImage;
