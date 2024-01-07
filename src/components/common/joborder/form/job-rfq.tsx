import FormInputAutoComplete from "@/components/atoms/input/auto-complete";
import { FormControl } from "@mui/material";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import instance from "@/config/axios.config";
import qs from "qs";
import parseAttributes from "@/utils/parse-data";

const RFQForm = ({ job }: { job: JobType }) => {
  const [vendors, setVendors] = React.useState<VendorType[]>([]);

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const apiRoute = qs.stringify({
    filters: {
      services: {
        id: {
          $containsi: job.services.map((service) => service.id),
        },
      },
    },
  });

  useEffect(() => {
    instance.get(`/vendors?${apiRoute}`).then((res) => {
      setVendors(parseAttributes(res.data.data));
      console.log(parseAttributes(res.data.data));
    });
  }, []);

  return (
    <FormControl fullWidth>
      <FormInputAutoComplete
        control={control}
        title="rfq"
        label="Vendors"
        options={vendors.map((vendor) => ({
          id: vendor.id,
          title: vendor.name,
        }))}
      />
    </FormControl>
  );
};

export default RFQForm;
