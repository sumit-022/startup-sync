import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import logo from "@/assets/image/logo.jpg";
import Image from "next/image";
import instance from "@/config/axios.config";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const router = useRouter();

  const onSubmit = (data: any) => {
    console.log(data);

    instance
      .post("/auth/local", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.jwt);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        
        if (err.response) {
          toast.error(err.response.data.message[0].messages[0].message);
        }
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex bg-white w-1/2 p-8 rounded-md flex-col gap-4 justify-center items-center text-black"
    >
      <Image src={logo} width={200} height={200} alt="logo" className="" />
      <h1 className="text-left font-bold text-lg uppercase">Login</h1>
      <div className="flex w-full flex-col gap-3">
        <TextField
          label="Username or Email"
          variant="outlined"
          {...register("identifier", {
            required: "This field is required",
          })}
          error={!!errors.identifier}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          {...register("password", {
            required: "This field is required",
          })}
          error={!!errors.password}
        />
      </div>
      <Button
        type="submit"
        className="bg-primary-bright-blue w-full"
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
