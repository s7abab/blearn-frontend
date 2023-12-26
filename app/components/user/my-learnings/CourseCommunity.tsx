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
      <button onClick={handleNavigation} className={styles.secondary_Btn}>
        Go to Community
      </button>
    </div>
  );
};

export default CourseCommunity;
