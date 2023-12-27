"use client";

import { styles } from "@/app/styles/style";
import { useGetCommunityByCourseIdQuery } from "@/redux/features/realtime/realtimeApi";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "../../common/spinners/Loader";

const CourseCommunity = () => {
  const { course } = useSelector((state: any) => state.course);
  const { data, isLoading } = useGetCommunityByCourseIdQuery(course._id);
  const router = useRouter();
  const handleNavigation = () => {
    router.push(`/community/${data?.chatRoom?._id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {data?.chatRoom ? (
        <>
          <div className="mb-4">
            <p className="font-Poppins text-[18px] font-medium">
              Welcome to Our Learning Community!
            </p>
            <p className="text-[14px] text-gray-600">
              Join us to share knowledge, ask questions, and grow together.
            </p>
          </div>

          {/* Community Rules */}
          <div className="mb-4">
            <p className="text-[16px] font-medium mb-1 font-Poppins">
              Community Guidelines:
            </p>
            <ul className="list-disc list-inside font-Josefin text-[15px]">
              <li>Respect each others opinions and ideas.</li>
              <li>Avoid spamming or irrelevant posts.</li>
              <li>Be polite and considerate in discussions.</li>
              {/* Add more rules as needed */}
            </ul>
          </div>

          <button onClick={handleNavigation} className={styles.secondary_Btn}>
            Open Community
          </button>
        </>
      ) : (
        <h1>This course dont have a community</h1>
      )}
    </div>
  );
};

export default CourseCommunity;
