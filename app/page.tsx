import React from "react";
import Hero from "./components/home/Hero";
import Heading from "./utils/Heading";
import Header from "./components/common/ui/Header";

type Props = {};
const page = (props: Props) => {
  return (
    <>
      <Heading
        title="BLeaner"
        description="BLeaner is online learning platform"
        keywords="development,arts,finance"
      />
      <Header />
      <Hero />
    </>
  );
};

export default page;
