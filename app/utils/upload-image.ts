import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseDB } from "@/app/utils/firebase";
import { v4 } from "uuid";
import toast from "react-hot-toast";

const uploadImage = async (image: any) => {
  const imgRef = ref(firebaseDB, `thumbnail/${v4()}`);
  if (image) {
    try {
      const snapshot = await uploadBytes(imgRef, image);
      const downloadURL = await getDownloadURL(imgRef);
      toast.success("Image uploaded successfully!");
      return downloadURL;
    } catch (error: any) {
      toast.success(error.message);
      console.error("Error uploading image:", error);
    }
  }
};

export default uploadImage;
