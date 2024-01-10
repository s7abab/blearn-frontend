import HeroSection from "./components/home/Hero";
import Heading from "./utils/Heading";
import Header from "./components/common/ui/Header";
import CoursesSection from "./components/home/CoursesSection";
import FeedbackSection from "./components/home/FeedbackSection";

const page = () => {
  return (
    <div className="min-h-screen">
      <Heading
        title="BLeaner"
        description="BLeaner is online learning platform"
        keywords="development,arts,finance"
      />
      <Header />
      <HeroSection />
      <CoursesSection />
      <FeedbackSection />
    </div>
  );
};

export default page;
