import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../atoms/input";

type ContactCardData = {
  name: string;
  message: string;
};

const ContactCard = ({
  onSubmit,
}: {
  onSubmit: (data?: ContactCardData) => void;
}) => {
  const { register, handleSubmit } = useForm<ContactCardData>();

  return (
    <div className="max-w-[600px] w-full mt-16 bg-gray-500/10 backdrop:blur-sm rounded-md p-8">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Input register={register} name="name" placeholder="Name" />
        <textarea
          className="w-full p-4 bg-gray-500/20 rounded-md"
          placeholder="Message"
          rows={5}
          {...register("message")}
        ></textarea>
        <button className="bg-pallete1-button-background text-white py-3 rounded-md font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactCard;
