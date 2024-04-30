import Navbar from "@/components/Landing/molecules/navbar";
import Hero from "@/components/Landing/organisms/hero";
import Highlight from "@/components/Landing/organisms/highlight";
import Features from "@/components/Landing/organisms/feature";
import Testimonial from "@/components/Landing/organisms/testimonial";
import Contact from "@/components/Landing/organisms/contact";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Highlight />
      <Features />
      <Testimonial />
      <Contact />
    </div>
  );
}
