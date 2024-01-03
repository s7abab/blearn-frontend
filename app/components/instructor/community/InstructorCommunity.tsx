"use client";
import { useGetCommunitiesForInstructorQuery } from "@/redux/features/realtime/realtimeApi";
import CommunityCard from "../../community/CommunityCard";
import CreateCommunity from "./CreateCommunity";
import { IChatRoom } from "@/@types/interfaces/realtime/chat.interface";
import { useRouter } from "next/navigation";

interface Props {
  isCreate?: boolean;
}
const InstructorCommunity = ({ isCreate = true }: Props) => {
  const { data } = useGetCommunitiesForInstructorQuery({});
  const communities: IChatRoom[] = data?.chatRooms;

  const router = useRouter();

  const handleNavigate = (id: string) => {
    router.push(`/community/${id}`);
  };

  return (
    <>
      {isCreate && <CreateCommunity />}
      <div className="flex flex-col gap-3 justify-center mt-5">
        {communities?.map((community) => (
          <div
            onClick={() => handleNavigate(community._id)}
            key={community._id}
            className="w-full"
          >
            <CommunityCard name={community?.name} />
          </div>
        ))}
      </div>
    </>
  );
};

export default InstructorCommunity;
