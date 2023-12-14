import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseDB } from "@/app/utils/firebase";
import { v4 } from "uuid";
import toast from "react-hot-toast";

const uploadVideo = async (video: any) => {
  try {
    const videoRef = ref(firebaseDB, `videos/${v4()}`);
    if (video) {
      const snapshot = await uploadBytes(videoRef, video);
      const downloadURL = await getDownloadURL(videoRef);
      toast.success("Video uploaded successfully!");
      return downloadURL;
    }
  } catch (error:any) {
    toast.error(error.message);

    console.error("Error uploading video:", error);
  }
};

export default uploadVideo;
