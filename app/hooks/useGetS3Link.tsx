import { useState } from "react";

const useGetS3Link = () => {
  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [s3Url, setS3Url] = useState("");

  const getFileUrl = async (fileName: any) => {
    if (!fileName) {
      return;
    }

    setloading(true);
    setSuccess(false);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLOUD_SRV_URL}/api/v1/upload?fileName=${fileName}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setS3Url(data);
        setSuccess(true);
        return data;
      } else {
        throw new Error("Failed to upload fileName");
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
    getFileUrl,
    s3Url,
  };
};


export default useGetS3Link;
