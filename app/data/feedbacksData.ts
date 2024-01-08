import avatar1 from "../../public/assets/avatar1.jpg";
import avatar2 from "../../public/assets/avatar2.jpg";
import avatar3 from "../../public/assets/avatar3.jpg";

const feedbacksData = [
  {
    courseId: "courseId1",
    userId: { avatar: avatar1 },
    rating: 4,
    comment:
      "Blearn does a good job of explaining the concepts in a clear and concise way, and the examples are well-chosen. Overall, this is a valuable resource for anyone who is new to programming",
  },
  {
    courseId: "courseId2",
    userId: { avatar: avatar2 },
    rating: 5,
    comment:
      "I highly recommend Next js mastery course for all. Even people with no prior knowledge of any visualization tools can become a master after completing this course.",
  },
  {
    courseId: "courseId3",
    userId: { avatar: avatar3 },
    rating: 5,
    comment:
      "One of the best courses on management and leadership I have come across so far. The advice is practical, and examples highly relatable. Would help anyone become a better manager.",
  },
];

export default feedbacksData;
