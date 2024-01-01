import Courses from "@/app/components/courses/Courses";
import Heading from "@/app/utils/Heading";

const CoursesPage = () => {
  return (
    <>
      <Heading
        title="Courses"
        description="Explore online courses in marketing, finance, e-commerce, and web development. Courses cater to all skill levels, offering specialized programs and certifications tailored to learners proficiency"
        keywords="Online Learning, Marketing, Finance, E-commerce, Web Development"
      />
      <Courses />
    </>
  );
};

export default CoursesPage;
