import React from "react";
import TestimonialCard from "@/components/Landing/molecules/cards/testimonial-cards";
import testimonialsData from "@/data/testimonials";

const Testimonial = () => {
  return (
    <div
      className="min-h-screen bg-background-primary flex-col bg-blend-lighten flex justify-center items-center py-28 px-16"
      id="contact"
    >
      <div className="flex flex-col items-center max-w-[800px]">
        <p className="text-pallete1-headersmall text-xl font-bold">
          Testimonials
        </p>
        <h3 className="text-4xl font-bold mt-4 text-pallete1-headerbig">
          Voices of Triumph
        </h3>
        <p className="text-center mt-4 text-pallete1-headercaption">
          Unveiling Stories of Success and Satisfaction Shared by Our Valued
          Partners and Clients!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard.Small key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
