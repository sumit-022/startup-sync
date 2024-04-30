import React from "react";
import { UseFormRegister, FieldValues, RegisterOptions } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  name: string;
}

const Input = ({ register, rules, name, ...rest }: InputProps) => {
  return (
    <input
      className="w-full p-4 bg-gray-500/20 rounded-md"
      {...register(name, rules)}
      {...rest}
    />
  );
};

export default Input;
