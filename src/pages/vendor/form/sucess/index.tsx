import React from "react";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import tickgif from "@/assets/gif/tick.gif";
import Image from "next/image";
import Button from "@/components/atoms/button";
import { useRouter } from "next/router";

const VendorRegisterSuccess = () => {
  const { user } = useContext(AuthContext);

  const router = useRouter();
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Image src={tickgif} alt="tick" />
        <h1 className="text-2xl font-semibold">
          Thank you for registering with us
        </h1>
        {user && (
          <Button
            onClick={() => router.push("/vendor")}
            className="mt-4 bg-red-500 hover:bg-red-600"
          >
            Go back
          </Button>
        )}
      </div>
    </div>
  );
};

export default VendorRegisterSuccess;
