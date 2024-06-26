import React, { useState } from "react";
import Card from "../atoms/card";
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import Banner from "../molecules/banner";
import { RiTeamFill } from "react-icons/ri";
import { GoGraph } from "react-icons/go";
import purchase from "@/assets/image/purchase.jpg";
import sales from "@/assets/image/sales.png";
import models from "@/assets/image/models.jpg";
import vendor from "@/assets/image/vendor.png";

const Features = () => {
  const [active, setActive] = useState(0);

  const features = [
    {
      icon: <MdSpaceDashboard size={30} />,
      title: "Dashboard",
      description:
        "Stay ahead with real-time insights: Startup Sync's dynamic dashboard keeps you informed at a glance.",
      image: sales,
    },
    {
      icon: <BiSolidPurchaseTag size={30} />,
      title: "Sales & Purchase",
      description:
        "Drive sales and optimize procurement: Streamline processes effortlessly with Startup Sync.",
      image: purchase,
    },
    {
      icon: <RiTeamFill size={30} />,
      title: "Vendor Management",
      description:
        "Centralize vendor management: Seamlessly collaborate and communicate with Startup Sync's integrated platform.",
      image: vendor,
    },
    {
      icon: <GoGraph size={30} />,
      title: "AI-ML Analytics",
      description:
        "Unlock the power of AI-driven analytics: Make informed decisions with Startup Sync's predictive insights.",
      image: models,
    },
  ];
  return (
    <div
      className="min-h-screen px-24 bg-background-primary flex-col bg-blend-lighten flex justify-center items-center py-20"
      id="features"
    >
      <div className="flex flex-col items-center max-w-[800px]">
        <p className="text-pallete1-headersmall text-xl font-bold text-gray-600">
          Features
        </p>
        <h3 className="text-4xl font-bold mt-4 text-pallete1-headerbig text-center">
          Unleash Efficiency - Explore Startup Sync&apos;s Powerful Features!
        </h3>
        <p className="text-center mt-4 text-pallete1-headercaption text-gray-700">
          Crafting convenience in every feature, we&apos;re dedicated to
          perfecting your experience with ongoing enhancements.
        </p>
      </div>
      <div className="grid place-items-center justify-center grid-cols-2 gap-8 mt-16">
        <div className="flex flex-col gap-6 text-blue-900">
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
        <Banner
          className="mt-0 lg:h-[450px] md:h-[300px] sm:h-[350px] h-[300px]"
          image={features[active].image}
        />
      </div>
    </div>
  );
};

export default Features;
