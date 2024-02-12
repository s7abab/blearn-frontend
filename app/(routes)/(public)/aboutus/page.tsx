import React from "react";
import Header from "@/app/components/common/ui/Header";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">About blearn</h2>
        <p className="mb-4">
          Welcome to blearn, your go-to platform for online learning! At
          blearn, we are passionate about education and dedicated to providing
          a high-quality learning experience for all our users.
        </p>
        <h3 className="text-xl font-bold mb-2">Our Mission</h3>
        <p className="mb-4">
          Our mission at blearn is to empower individuals worldwide by offering
          accessible and affordable education that fosters personal and
          professional growth.
        </p>
        <h3 className="text-xl font-bold mb-2">Our Vision</h3>
        <p className="mb-4">
          We envision a future where education knows no bounds - where anyone,
          regardless of background or location, can pursue their passions and
          achieve their goals through our platform.
        </p>
        <h3 className="text-xl font-bold mb-2">Why Choose blearn?</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Comprehensive courses taught by industry experts</li>
          <li>Flexible learning options to fit your schedule</li>
          <li>Engaging and interactive learning experience</li>
          <li>Community support and networking opportunities</li>
          <li>Constantly evolving content to keep up with the latest trends and technologies</li>
        </ul>
        <p>
          Join us on this exciting journey of learning and discovery at blearn!
        </p>
      </div>
    </>
  );
};

export default AboutUs;
