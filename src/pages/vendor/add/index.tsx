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
import CommercialDetails from "@/components/common/vendor/forms/commercial";

const VendorRegistrationPage = () => {
  const { authData } = useAuth();
  const labels = [
    { label: "Vendor Details", icon: FaRegAddressCard },
    { label: "Contact Details", icon: FaPhone },
    { label: "Bank Details", icon: BsBank2 },
    { label: "Commercial & Company Details", icon: BiSolidDetail },
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      services: [],
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
          case 3:
            return <CommercialDetails control={control} />;
          default:
            return null;
        }
      })()}
      <div className="flex gap-4 mt-6">
        {activeStep !== 0 && (
          <Button
            variant="contained"
            className="bg-gray-500 hover:bg-gray-600"
            onClick={stepcontrols.prevStep}
          >
            Previous
          </Button>
        )}
        {activeStep !== labels.length - 1 && (
          <Button
            variant="contained"
            className="bg-blue-500 hover:bg-blue-600"
            onClick={stepcontrols.nextStep}
          >
            Next
          </Button>
        )}
        {activeStep === labels.length - 1 && (
          <Button
            variant="contained"
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VendorRegistrationPage;
