import { StaticImageData } from "next/image";
import profileImage from "../assets/image/avatars/user.jpeg";
type Testimonial = {
  name: string;
  username: string;
  designation: string;
  message: string;
  company: string;
  image: string | StaticImageData;
};

const testimonialsData: Testimonial[] = [
  {
    name: "John Doe",
    username: "@johndoe",
    designation: "CEO",
    company: "Company Name",
    message:
      "Exceptional service! Startup Sync has revolutionized the way we manage projects. It's intuitive, efficient, and an absolute game- changer for our team",
    image: profileImage,
  },
  {
    name: "Jane Doe",
    username: "@janedoe",
    designation: "CFO",
    company: "Company Name",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: profileImage,
  },
  {
    name: "John Doe",
    username: "@johndoe",
    company: "Company Name",
    designation: "CEO",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: profileImage,
  },
  // {
  //   name: "Jane Doe",
  //   username: "@janedoe",
  //   company: "Company Name",
  //   designation: "CFO",
  //   message:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   image: profileImage,
  // },
  // {
  //   name: "John Doe",
  //   username: "@johndoe",
  //   company: "Company Name",
  //   designation: "CEO",
  //   message:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   image: profileImage,
  // },
  // {
  //   name: "Jane Doe",
  //   username: "@janedoe",
  //   company: "Company Name",
  //   designation: "CFO",
  //   message:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   image: profileImage,
  // },
  // {
  //   name: "John Doe",
  //   username: "@johndoe",
  //   company: "Company Name",
  //   designation: "CEO",
  //   message:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   image: profileImage,
  // },
  // {
  //   name: "Jane Doe",
  //   username: "@janedoe",
  //   company: "Company Name",
  //   designation: "CFO",
  //   message:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   image: profileImage,
  // },
];

export default testimonialsData;
