import Steps from "@/components/atoms/step";
import DashboardLayout from "@/components/layout";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { Button, Typography } from "@mui/material";
import { BiSolidDetail } from "react-icons/bi";
import { useForm } from "react-hook-form";
import VendorDetails from "@/components/common/vendor/forms/details";
import ContactDetails from "@/components/common/vendor/forms/contact";
import BankDetails from "@/components/common/vendor/forms/bank";

const VendorRegistrationPage = () => {
  const { authData, isLoading } = useAuth();
  const labels = [
    { label: "Vendor Details", icon: FaRegAddressCard },
    { label: "Contact Details", icon: FaPhone },
    { label: "Bank Details", icon: BsBank2 },
    { label: "Commercial & Company Details", icon: BiSolidDetail },
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const { control, handleSubmit } = useForm();

  const stepcontrols = {
    nextStep: () => {
      setActiveStep((prev) => prev + 1);
    },
    prevStep: () => {
      setActiveStep((prev) => prev - 1);
    },
  };

  return (
    <DashboardLayout header={true} user={authData}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          textTransform: "uppercase",
          color: "#2D2D2D",
          textDecoration: "underline",
          marginBottom: "2rem",
        }}
      >
        Vendor Registration
      </Typography>
      <Steps steps={labels} activeStep={activeStep} />
      {(() => {
        switch (activeStep) {
          case 0:
            return <VendorDetails control={control} />;
          case 1:
            return <ContactDetails control={control} />;
          case 2:
            return <BankDetails control={control} />;
          default:
            return <h1>Hello</h1>;
        }
      })()}
      <div className="flex gap-4 mt-6">
        <Button
          variant="contained"
          size="large"
          onClick={stepcontrols.prevStep}
          disabled={activeStep === 0}
          className="bg-red-600"
        >
          Previous
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={stepcontrols.nextStep}
          disabled={activeStep === labels.length - 1}
          className="bg-green-600 hover:bg-green-700"
        >
          Next
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default VendorRegistrationPage;
