import { useState } from "react";

const useFileUpload = () => {
  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const uploadFile = async (file: any) => {
    if (!file) {
      return;
    }

    setloading(true);
    setSuccess(false);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLOUD_SRV_URL}/api/v1/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        return data.fileName;
      } else {
        throw new Error("Failed to upload file");
      }
    } catch (error) {
      setError("Error uploading file. Please try again.");
    } finally {
      setloading(false);
    }
  };

  return {
    loading,
    success,
    error,
    uploadFile,
  };
};

export default useFileUpload;
