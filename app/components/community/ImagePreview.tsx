import { IoSend } from "react-icons/io5";
import Image from "next/image";

interface ImagePreviewProps {
  selectedImage: File | null;
  sendImage: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ selectedImage, sendImage }) => {
  return (
    <div className="p-4">
      {selectedImage && (
        <Image
          src={URL.createObjectURL(selectedImage)}
          alt="Selected"
          width={200}
          height={200}
          className="rounded-md"
        />
      )}
      {selectedImage && (
        <button onClick={sendImage} className="bg-blue-500 text-white mt-2 p-2 rounded-md">
          <IoSend />
        </button>
      )}
    </div>
  );
};

export default ImagePreview;
