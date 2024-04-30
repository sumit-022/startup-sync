import React, { useState } from "react";
import Card from "../atoms/card";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { BsFillCalendar2EventFill } from "react-icons/bs";
import Banner from "../molecules/banner";

const Features = () => {
  const [active, setActive] = useState(0);

  const features = [
    {
      icon: <MdSpaceDashboard size={30} />,
      title: "Dashboard",
      description: "Get a quick overview of your business in one place.",
    },
    {
      icon: <BiSolidPurchaseTag size={30} />,
      title: "Sales & Purchase",
      description: "Keep track of your sales and purchases.",
    },
    {
      icon: <FaDollarSign size={30} />,
      title: "Expense Management",
      description: "Manage your expenses and keep track of your spending.",
    },
    {
      icon: <BsFillCalendar2EventFill size={30} />,
      title: "Event Management",
      description: "Schedule and manage your events and appointments.",
    },
  ];
  return (
    <div
      className="min-h-screen px-8 bg-background-primary flex-col text-white bg-blend-lighten flex justify-center items-center py-20"
      id="features"
    >
      <div className="flex flex-col items-center max-w-[800px]">
        <p className="text-pallete1-headersmall text-xl font-bold">Features</p>
        <h3 className="text-4xl font-bold mt-4 text-pallete1-headerbig">
          Why Choose Us?
        </h3>
        <p className="text-center mt-4 text-pallete1-headercaption">
          Every feature is designed to make your life easier and better. We are
          constantly working on improving our product so that you can have the
          best experience.
        </p>
      </div>
      <div className="grid place-items-center justify-center grid-cols-2 gap-8 mt-16">
        <div className="flex flex-col gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              active={active === index}
              onClick={() => {
                setActive(index);
              }}
            />
          ))}
        </div>
        <Banner className="mt-0 lg:h-[450px] md:h-[300px] sm:h-[350px] h-[300px]" />
      </div>
    </div>
  );
};

export default Features;
