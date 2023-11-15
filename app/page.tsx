import React from "react";
import Header from "./components/ui/Header";
import Hero from "./components/home/Hero";
import Heading from "./utils/Heading";

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
