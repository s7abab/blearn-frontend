import { FaEdit } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CustomModal from "../../common/modals/CustomModal";
import AddModule from "../../instructor/modules/AddModule";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDeletModuleMutation } from "@/redux/features/course/courseApi";
import ConfirmBox from "../../common/modals/ConfirmBox";
import { IModule } from "@/@types/interfaces/course/module.interface";

interface Props {
  module: IModule;
  edit: boolean;
  lesson: boolean;
  setLesson: any;
  index: number;
}

const ModuleComponent = ({ module, edit, lesson, setLesson, index }: Props) => {
  const { course } = useSelector((state: any) => state.course);
  const [deleteModule] = useDeletModuleMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const courseId = course?._id;

  const toggleLesson = () => {
    setLesson(!lesson);
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const toggleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  const handleDeleteModule = () => {
    deleteModule({
      courseId,
      index,
    });
  };

  const toggleConfirmDelete = () => {
    setConfirmDelete(true);
  };
  useEffect(() => {
    if (confirmDelete) {
      handleDeleteModule();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmDelete]);

  return (
    <>
      {open && (
        <CustomModal
          isOpen={open}
          onClose={toggleModal}
          modalHeader="Edit Module"
        >
          <AddModule
            index={index}
            data={module}
            edit={true}
            closeModal={toggleModal}
          />
        </CustomModal>
      )}
      {confirmModal && (
        <CustomModal isOpen={confirmModal} onClose={toggleConfirmModal}>
          <ConfirmBox
            title="Are you sure you want delete?"
            isDelete={true}
            close={toggleConfirmModal}
            confirm={toggleConfirmDelete}
          />
        </CustomModal>
      )}
      <div className="cursor-pointer flex justify-between">
        {edit && (
          <div className="flex gap-4 items-center">
            <FaEdit size={18} onClick={toggleModal} />
            <MdOutlineDeleteOutline onClick={toggleConfirmModal} size={20} />
          </div>
        )}
        <h1 className="text-lg">{module?.title}</h1>
        <IoIosArrowDown onClick={toggleLesson} size={20} />
      </div>
    </>
  );
};

export default ModuleComponent;
