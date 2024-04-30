import React from "react";
import { HiLightningBolt } from "react-icons/hi";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="flex flex-col max-w-[300px] items-center">
      <div className="bg-pallete1-title p-2 rounded-full">{icon}</div>
      <h3 className="text-xl font-bold mt-4 text-pallete1-title">{title}</h3>
      <p className="text-center mt-4 text-gray-400">{description}</p>
    </div>
  );
};

const Hightlights = () => {
  const highlights: FeatureCardProps[] = [
    {
      title: "Fast and Reliable",
      description:
        "Our product is fast and reliable. You can count on us to deliver your data. We have a 99.9% uptime.",
      icon: <HiLightningBolt size={25} />,
    },
    {
      title: "Fast and Reliable",
      description:
        "Our product is fast and reliable. You can count on us to deliver your data. We have a 99.9% uptime.",
      icon: <HiLightningBolt size={25} />,
    },
    {
      title: "Fast and Reliable",
      description:
        "Our product is fast and reliable. You can count on us to deliver your data. We have a 99.9% uptime.",
      icon: <HiLightningBolt size={25} />,
    },
    {
      title: "Fast and Reliable",
      description:
        "Our product is fast and reliable. You can count on us to deliver your data. We have a 99.9% uptime.",
      icon: <HiLightningBolt size={25} />,
    },
    {
      title: "Fast and Reliable",
      description:
        "Our product is fast and reliable. You can count on us to deliver your data. We have a 99.9% uptime.",
      icon: <HiLightningBolt size={25} />,
    },
  ];

  return (
    <div
      className="min-h-screen bg-background-primary flex-col text-white bg-blend-lighten flex justify-center items-center py-28"
      id="highlights"
    >
      <div className="flex flex-col items-center max-w-[800px]">
        <p className="text-xl font-bold text-pallete1-headersmall">
          Highlights
        </p>
        <h3 className="text-4xl font-bold mt-4 text-pallete1-headerbig">
          Why Choose Us?
        </h3>
        <p className="text-center mt-4 text-pallete1-headercaption">
          Every feature is designed to make your life easier and better. We are
          constantly working on improving our product so that you can have the
          best experience.
        </p>
      </div>
      <div className="flex gap-8 mt-8 flex-wrap justify-center">
        {highlights.map((highlight, index) => (
          <FeatureCard key={index} {...highlight} />
        ))}
      </div>
    </div>
  );
};

export default Hightlights;
