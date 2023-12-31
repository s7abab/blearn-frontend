"use client";
import useGetS3Link from "@/app/hooks/useGetS3Link";
import Image from "next/image";
import { useEffect } from "react";

interface Props {
  imgUrl: string;
}

const CourseImage = ({ imgUrl }: Props) => {
  const { loading, getFileUrl, s3Url } = useGetS3Link();
  console.log(s3Url, imgUrl);
  useEffect(() => {
    if (imgUrl) {
      getFileUrl(imgUrl);
    }
    // eslint-disable-next-line
  }, [imgUrl]);
  return <Image src={s3Url} layout="fill" objectFit="cover" alt="Course" />;
};

export default CourseImage;
