"use client";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { BsPip } from "react-icons/bs";

type Props = {
  url: string;
};
const VideoPlayer = ({ url }: Props) => {
  const [pip, setPip] = useState(false);
  return (
    <div className="relative p-2">
      <ReactPlayer
        url={url}
        controls={true}
        playing
        pip={pip}
        stopOnUnmount
        width={"100%"}
        height={"100%"}
      />
      <BsPip
        className="absolute bottom-1 right-1 cursor-pointer"
        size={25}
        onCLick={() => setPip(!pip)}
      />
    </div>
  );
};

export default VideoPlayer;
