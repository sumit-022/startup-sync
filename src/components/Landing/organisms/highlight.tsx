import React from "react";
import { HiLightningBolt } from "react-icons/hi";
import { FaTasks } from "react-icons/fa";
import { CgInsights } from "react-icons/cg";
import { MdBarChart } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { MdAttachMoney } from "react-icons/md";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="grid grid-rows-[auto,1fr] place-items-center text-center max-w-[300px] gap-3 items-center">
      <div className="flex gap-3">
        <div className="bg-pallete1-title rounded-full text-blue-800">{icon}</div>
        <h3 className="text-xl font-bold text-pallete1-title text-blue-800">
          {title}
        </h3>
      </div>
      <p className=" text-gray-500 h-full">{description}</p>
    </div>
  );
};

const Hightlights = () => {
  const highlights: FeatureCardProps[] = [
    {
      title: "Streamlined Operations",
      description:
        "Optimize sales and procurement processes with Startup Sync's comprehensive solution, reducing time spent on manual tasks and improving overall efficiency.",
      icon: <FaTasks size={25} />,
    },
    {
      title: "AI-Powered Insights",
      description:
        "Gain a competitive edge with AI-driven analytics that predict sales trends, identify top performers, and recommend the best vendors, enabling informed decision-making.",
      icon: <CgInsights size={25} />,
    },
    {
      title: "Real-Time Data Access",
      description:
        "Access up-to-date information and generate insightful reports instantly, empowering users to make data-driven decisions and stay ahead of the curve.",
      icon: <MdBarChart size={25} />,
    },
    {
      title: "Enhanced Collaboration",
      description:
        "Foster seamless communication and collaboration among team members and vendors through Startup Sync's centralized platform, boosting productivity and project success.",
      icon: <RiTeamFill size={25} />,
    },
    {
      title: "Cost Savings",
      description:
        "Secure better terms from vendors and optimize resource allocation with Startup Sync's intelligent features, leading to significant cost savings on procurement and improved bottom-line performance.",
      icon: <MdAttachMoney size={25} />,
    },
    {
      title: "Scalability and Flexibility",
      description:
        "Grow your startup confidently knowing that Startup Sync can scale with your business needs and adapt to changing requirements, providing a reliable solution for both current and future endeavors.",
      icon: <HiLightningBolt size={25} />,
    },
  ];

  return (
    <div
      className="min-h-screen bg-background-primary flex-col bg-blend-lighten flex justify-center items-center py-28"
      id="highlights"
    >
      <div className="flex flex-col items-center max-w-[800px]">
        <p className="text-xl text-gray-600 font-bold text-pallete1-headersmall">
          Highlights
        </p>
        <h3 className="text-4xl font-bold mt-4 text-pallete1-headerbig">
          Why Choose Us?
        </h3>
        <p className="text-center text-gray-600 mt-4 text-pallete1-headercaption">
          From seamless operations to AI-driven insights, every feature in
          Startup Sync is crafted to elevate your journey. With continuous
          enhancements, we&apos;re dedicated to ensuring you enjoy nothing but the
          finest experience, always.
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
