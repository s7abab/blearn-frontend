"use client";
import { useEffect, useState } from "react";
import { applyFormData } from "@/app/data/apply-form-data";
import { useInstructoApplicationMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ValuationCard from "../ValuationCard";

export interface DataState {
  [key: number]: number;
}

const ApplicationForm = () => {
  const [step, setStep] = useState<number>(0);
  const [data, setData] = useState<DataState>({
    1: 0,
    2: 0,
    3: 0,
  });
  const [applyAsInstructor, { isLoading, isSuccess, error }] =
    useInstructoApplicationMutation();

  const router = useRouter();
  const handleNext = () => {
    const currentOption = data[step + 1];
    // Check if the user has selected an option for the current step
    if (currentOption === 0) {
      toast.error("Please select an option");
      return;
    }
    if (step > 1) {
      handleSubmitApplication();
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleOptionSelect = (optionValue: number) => {
    setData((prevData) => ({
      ...prevData,
      [step + 1]: optionValue,
    }));
  };

  const handleSubmitApplication = async () => {
    await applyAsInstructor(data);
  };
  const progress = ((step + 1) / applyFormData.length) * 100;
  const currentData = applyFormData.find((item) => item.no === step);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Application sent successfully");
      router.push("/");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        router.push("/");
      }
    }
    // eslint-disable-next-line
  }, [isSuccess, error]);
  return (
    <ValuationCard
      currentData={currentData}
      data={data}
      handleNext={handleNext}
      handlePrev={handlePrev}
      handleOptionSelect={handleOptionSelect}
      progress={progress}
      step={step}
    />
  );
};

export default ApplicationForm;
