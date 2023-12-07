import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseDB } from "@/app/utils/firebase";
import { v4 } from "uuid";

const uploadImage = async (image: any) => {
  const imgRef = ref(firebaseDB, `thumbnail/${v4()}`);
  if (image) {
    try {
      const snapshot = await uploadBytes(imgRef, image);
      const downloadURL = await getDownloadURL(imgRef);
      return downloadURL;
    } catch (error: any) {
      console.error("Error uploading image:", error);
    }
  }
};

export default uploadImage;
