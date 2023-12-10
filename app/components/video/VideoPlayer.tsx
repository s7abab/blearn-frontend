import React from "react";
import ReactPlayer from "react-player";

type Props = {
  url: string;
  height:string,
};
const VideoPlayer = ({ url,height }: Props) => {
  return (
    <div className="relative p-2">
      <ReactPlayer
        url={url}
        controls={true}
        playing
        stopOnUnmount
        width={"100%"}
        height={height}
      />
    </div>
  );
};

export default VideoPlayer;
