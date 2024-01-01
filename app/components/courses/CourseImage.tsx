"use client";
import useGetS3Link from "@/app/hooks/useGetS3Link";
import Image from "next/image";
import { useEffect } from "react";
import SmallLoader from "../common/spinners/SmallLoader";

interface Props {
  imgUrl: string;
}

const CourseImage = ({ imgUrl }: Props) => {
  const { loading, getFileUrl, s3Url } = useGetS3Link();

  useEffect(() => {
    if (imgUrl) {
      getFileUrl(imgUrl);
    }
    // eslint-disable-next-line
  }, [imgUrl]);
  return (
    <>
      {loading ? (
        <SmallLoader />
      ) : (
        <Image src={s3Url} layout="fill" objectFit="cover" alt="Course image" />
      )}
    </>
  );
};

export default CourseImage;
