import Header from "@/app/components/common/ui/Header";
import WatchCourse from "@/app/components/user/my-learnings/watch-course/WatchCourse";
import Heading from "@/app/utils/Heading";

const WatchCoursePage = () => {
  return (
    <>
      <Heading
        title="my-learnings"
        description="learnings"
        keywords="course, e-learning, udemy"
      />
      <Header />
      <WatchCourse />
    </>
  );
};

export default WatchCoursePage;
