import React from "react";
import LoginForm from "@/components/common/auth/login-form";
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
