import { ILesson } from "@/@types/interfaces/course/lesson.interface";
import CustomModal from "../../common/modals/CustomModal";
import DocumentLesson from "./Document";
import VideoLesson from "./VideoLesson";

interface Props {
  selectedOption: string;
  handleModal: () => void;
  handleLessonTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  isLoading: boolean;
  open: boolean;
  lessonDetails: ILesson;
  handleUploadLesson: () => void;
  handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  edit?: boolean;
  lesson?: ILesson;
}

const LessonInput = ({
  selectedOption,
  handleModal,
  handleFileChange,
  handleLessonTitle,
  isLoading,
  loading,
  open,
  lessonDetails,
  handleUploadLesson,
  handleSelectChange,
  edit,
  lesson,
}: Props) => {
  return (
    <div className="mt-5">
      {(selectedOption === "video" || lesson?.type === "video") && (
        <CustomModal onClose={handleModal} isOpen={open}>
          <VideoLesson
            handleChange={handleLessonTitle}
            handleFileChange={handleFileChange}
            loading={loading}
            addLoading={isLoading}
            video={lessonDetails?.url}
            title={lessonDetails.title}
            handleSubmit={handleUploadLesson}
          />
        </CustomModal>
      )}
      {selectedOption === "document" && (
        <CustomModal onClose={handleModal} isOpen={open}>
          <DocumentLesson
            handleChange={handleLessonTitle}
            handleFileChange={handleFileChange}
            loading={loading}
            addLoading={isLoading}
            video={lessonDetails.url}
            handleSubmit={handleUploadLesson}
          />
        </CustomModal>
      )}
      {!edit && (
        <select
          value={selectedOption} 
          onChange={handleSelectChange}
          className="p-1 rounded-md  font-Josefin text-dark-primary  cursor-pointer"
        >
          <option value={""}> Add lesson</option>
          <option value={"video"}>Video</option>
          <option value={"document"}>Document</option>
        </select>
      )}
    </div>
  );
};

export default LessonInput;
