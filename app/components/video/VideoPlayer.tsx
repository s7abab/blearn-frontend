"use client";
import ReactPlayer from "react-player";

type Props = {
  url: string;
  height: string;
  handleProgress?: (state: { played: number })=> void
};

const VideoPlayer = ({ url, height, handleProgress }: Props) => {

  return (
    <div className="relative p-2">
      <ReactPlayer
        url={url}
        controls={true}
        playing
        stopOnUnmount
        width={"100%"}
        height={height}
        onProgress={handleProgress}
      />
    </div>
  );
};

export default VideoPlayer;
