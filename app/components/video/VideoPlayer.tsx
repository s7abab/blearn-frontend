"use client";
import useGetS3Link from "@/app/hooks/useGetS3Link";
import { useEffect } from "react";
import ReactPlayer from "react-player";

interface Props {
  url: string;
  height: string;
  handleProgress?: (state: { played: number }) => void;
}
// disable right button
const disableContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
  event.preventDefault();
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
    <div className="relative md:p-2 " onContextMenu={disableContextMenu}>
      <ReactPlayer
        url={s3Url}
        controls={true}
        stopOnUnmount
        width={"100%"}
        height={height}
        onProgress={handleProgress}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload", // remove download button
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
