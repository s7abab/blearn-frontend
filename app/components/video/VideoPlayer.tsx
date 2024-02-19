import useGetS3Link from "@/app/hooks/useGetS3Link";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface Props {
  url: string;
  height: string;
  handleProgress?: (state: { played: number }) => void;
}

// Function to disable right-click context menu
const disableContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
  event.preventDefault();
};

const VideoPlayer = ({ url, height, handleProgress }: Props) => {
  const { s3Url, getFileUrl } = useGetS3Link();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (url) {
      getFileUrl(url);
    }
  }, [url]);

  // Check for screen recording software
  useEffect(() => {
    const checkScreenRecording = () => {
      const mediaDevices = navigator.mediaDevices as any;
      if (mediaDevices.getDisplayMedia || mediaDevices.getDisplayMedia) {
        setShowOverlay(true); // Show overlay if screen recording is detected
      }
    };

    checkScreenRecording();

    const interval = setInterval(checkScreenRecording, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

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
    
    {/* disble screen shot and screen record */}
      {showOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.01)", // Transparent background
            pointerEvents: "none", // Allow clicks to pass through
          }}
        ></div>
      )}
    </div>
  );
};

export default VideoPlayer;
