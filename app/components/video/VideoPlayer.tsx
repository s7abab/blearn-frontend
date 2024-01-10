"use client";
import useGetS3Link from "@/app/hooks/useGetS3Link";
import { useEffect } from "react";
import ReactPlayer from "react-player";

type Props = {
  url: string;
  height: string;
  handleProgress?: (state: { played: number }) => void;
};

const VideoPlayer = ({ url, height, handleProgress }: Props) => {
  const { s3Url, getFileUrl } = useGetS3Link();
  useEffect(() => {
    if (url) {
      getFileUrl(url);
    }
    // eslint-disable-next-line
  }, [url]);
  return (
    <div className="relative md:p-2">
      <ReactPlayer
        url={s3Url}
        controls={true}
        stopOnUnmount
        width={"100%"}
        height={height}
        onProgress={handleProgress}
      />
    </div>
  );
};

export default VideoPlayer;
