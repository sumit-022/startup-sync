import React from "react";
import ContactCard from "../molecules/cards/contact-card";

const Contact = () => {
  return (
    <div
      className="min-h-screen bg-background-primary flex-col flex justify-center items-center py-28"
      id="contact"
    >
      <div className="flex flex-col items-center max-w-[800px]">
        <p className="text-pallete1-headersmall text-xl font-bold text-gray-600">
          Contact Us
        </p>
        <h3 className="text-4xl font-bold mt-4 text-pallete1-headerbig">
          Get in touch with us
        </h3>
        <p className="text-center mt-4 text-pallete1-headercaption text-gray-700">
          We extend our assistance to address any inquiries or concerns you may
          have. Please feel free to contact us at your convenience.
        </p>
      </div>
      <ContactCard
        onSubmit={(data) => {
          if (data) {
            console.log(data);
          }
        }}
      />
    </div>
  );
};

export default Contact;
