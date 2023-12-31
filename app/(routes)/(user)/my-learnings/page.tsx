'use client'
import Header from "@/app/components/common/ui/Header";
import MyLearnings from "@/app/components/user/my-learnings/MyLearnings";
import { useSelector } from "react-redux";

const MyLearningsPage = () => {
  const {user} = useSelector((state:any)=> state.auth)
  return (
    <div className="min-h-screen">
      <Header />
      <MyLearnings user={user} />
    </div>
  );
};

export default MyLearningsPage;
