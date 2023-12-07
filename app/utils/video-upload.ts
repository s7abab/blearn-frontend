import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseDB } from "@/app/utils/firebase";
import { v4 } from "uuid";

const uploadVideo = async (video: any) => {
  try {
    const videoRef = ref(firebaseDB, `videos/${v4()}`);
    if (video) {
      const snapshot = await uploadBytes(videoRef, video);
      const downloadURL = await getDownloadURL(videoRef);
      return downloadURL;
    }
  } catch (error) {
    console.error("Error uploading video:", error);
  }
};

export default uploadVideo;
