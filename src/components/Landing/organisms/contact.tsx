import React from "react";
import ContactCard from "../molecules/cards/contact-card";

const Contact = () => {
  return (
    <div
      className="min-h-screen bg-background-primary flex-col text-white flex justify-center items-center py-28"
      id="contact"
    >
      <div className="flex flex-col items-center max-w-[800px]">
        <p className="text-pallete1-headersmall text-xl font-bold">
          Contact Us
        </p>
        <h3 className="text-4xl font-bold mt-4 text-pallete1-headerbig">
          Get in touch with us
        </h3>
        <p className="text-center mt-4 text-pallete1-headercaption">
          We are here to help you with any queries you have. Feel free to
          contact us.
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
