import React from "react";
import Header from "@/app/components/common/ui/Header";

const ContactUs = () => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">
          Have a question or feedback for us? We would love to hear from you!
          Feel free to reach out to us at{" "}
          <a href="mailto:blearndotcom@gmail.com">blearndotcom@gmail.com</a>.
        </p>
        <p className="mb-4">
          Alternatively, you can fill out the form below and we will get back to
          you as soon as possible:
        </p>
      </div>
    </>
  );
};

export default ContactUs;
