"use client";
import { useState } from "react";
import Exam from "./exam/Exam";
import CustomModal from "../common/modals/CustomModal";
import { useGetExamQuery } from "@/redux/features/valuation/valuationApi";
import { useSelector } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Certificate from "../Certificate";

const GetCertificateBtn = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { course } = useSelector((state: any) => state.course);
  const { user } = useSelector((state: any) => state.auth);
  const { data, isLoading } = useGetExamQuery(course._id);
  const questions = data?.exam?.questions;
  const isCompleted = data?.exam?.completedUsers.includes(user._id);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="flex justify-center items-center border rounded-md mt-2 p-2 gap-1">
      <div className="">
        {open && (
          <CustomModal isOpen={open} onClose={handleOpen} modalHeader="Exam">
            <Exam isLoading={isLoading} questions={questions} />
          </CustomModal>
        )}
      </div>
      {isCompleted ? (
        <PDFDownloadLink
          document={
            <Certificate
              recipientName={user?.name}
              courseName={course?.title}
            />
          }
          fileName="Certificate.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading..." : "Get Certificate"
          }
        </PDFDownloadLink>
      ) : (
        <button onClick={handleOpen}>Get Certificate</button>
      )}
    </div>
  );
};

export default GetCertificateBtn;
