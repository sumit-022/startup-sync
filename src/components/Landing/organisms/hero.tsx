import React from "react";
import Button from "@/components/Landing/atoms/button";
import Redirect from "@/components/Landing/atoms/link";
import Banner from "../molecules/banner";
import { useRouter } from "next/navigation";
import models from "@/assets/image/models.jpg"

const Hero = () => {
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-[url('https://tailwindui.com/img/beams-home@95.jpg')] bg-contain grid grid-cols-2 gap-8 p-10 place-items-center justify-center"
      id="#home"
    >
      <div className="max-w-[600px]">
        <h1 className="text-5xl font-bold text-pallete1-headersmall">
          Syncing Innovation Igniting Entrepreneurship!
        </h1>
        <p className="text-gray-600 mt-6">
          Revolutionize the way your startup navigates sales and procurement
          with Startup Sync, your all-in-one solution tailored to streamline
          operations and drive efficiency.
        </p>
        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Get Started
          </Button>
          <Button variant="pill">Learn More</Button>
        </div>
      </div>
      <Banner image={models}/>
    </div>
  );
};

export default Hero;
