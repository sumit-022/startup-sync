import AddCompany from "./joborder-addcompany";
import AddAgent from "./joborder-addagent";
import instance from "@/config/axios.config";
import { Autocomplete, Button, FormControl, TextField } from "@mui/material";
import Modal from "@/components/atoms/modal";
import clsx from "clsx";
import InputGroup from "@/components/atoms/input/input-group";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import getServices from "@/utils/getServices";
import FormInputText from "@/components/atoms/input/text";
import FormInputDate from "@/components/atoms/input/date";
import FormInputSelect from "@/components/atoms/input/select";
import FormInputAutoComplete from "@/components/atoms/input/auto-complete";
import { toast } from "react-toastify";
import parseAttributes from "@/utils/parse-data";
import { NotificationContext } from "@/context/NotificationContext";
import { getEngineers } from "@/utils/getEngineers";

interface JobOrderFormProperties {
  mode: "edit" | "create";
  authData: AuthData | null;
  onClose?: () => void;
  data?: any;
  callback: any;
}

const JobOrderForm: React.FC<JobOrderFormProperties> = ({
  mode,
  authData,
  onClose,
  data,
  callback,
}) => {
  const [services, setServices] = React.useState<
    {
      id: number;
      title: string;
    }[]
  >([]);
  const [engineers, setEngineers] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [option, setOption] = React.useState<string | null>(null);
  const [upload, setUpload] = React.useState(false);
  const [companies, setCompanies] = React.useState([]);

  console.log(data.assignedTo);

  const { handleSubmit, control } = useForm<JobFormType>({
    defaultValues: (data && {
      ...data,
      assignedTo: {
        id: data.assignedTo.id,
        name: data.assignedTo.fullname,
      },
      company: data.company.id,
    }) || {
      assignedTo: {
        id: authData?.id,
        name: authData?.fullname,
      },
    },
  });
  console.log({ authData });

  useEffect(() => {
    getServices().then((data) => {
      const parsedData = parseAttributes(data);
      setServices(parsedData);
    });
  }, []);

  useEffect(() => {
    getEngineers().then((data) => {
      setEngineers(data);
    });
  }, []);

  useEffect(() => {
    instance
      .get("/companies?pagination[page]=1&pagination[pageSize]=1000")
      .then((res) => {
        setCompanies(parseAttributes(res.data.data));
      });
  }, []);

  const onSubmit = (data: any) => {
    if (mode === "create") {
      instance
        .post("/jobs", {
          services: data.services.map((service: any) => service.id),
          ...data,
        })
        .then((res) => {
          toast.success("Job Created Successfully", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            pauseOnHover: true,
          });
        })
        .finally(() => {
          callback();
          onClose && onClose();
        });
    } else if (mode === "edit") {
      instance
        .put(`/jobs/${data.id}`, {
          data: {
            services: data.services.map((service: any) => service.id),
            ...data,
          },
        })
        .then((res) => {
          toast.success("Job Updated Successfully", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            pauseOnHover: true,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Job Update Failed", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            pauseOnHover: true,
          });
        })
        .finally(() => {
          callback && callback();
          onClose && onClose();
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 text-black"
    >
      <h1 className="text-left font-bold text-lg uppercase">
        {mode === "edit" ? "Edit a Job" : "Create a Job"}
      </h1>
      <InputGroup inputs={mode === "edit" ? 3 : 1}>
        {mode === "edit" && (
          <FormInputText
            disabled
            name="jobCode"
            label="JOB CODE"
            control={control}
          />
        )}
        <FormInputDate
          name="receivedAt"
          label="QUERY RECIEVED ON"
          control={control}
        />
        {mode === "edit" && (
          <FormInputDate
            name="quotedAt"
            label="QUOTATION DATE"
            control={control}
          />
        )}
      </InputGroup>
      <InputGroup inputs={2}>
        <FormInputText name="shipName" label="SHIP NAME" control={control} />
        <div className="grid grid-cols-[1fr,auto]">
          <FormInputSelect
            id="company"
            name="company"
            label="COMPANY NAME"
            control={control}
            options={companies.map((company: any) => ({
              id: company.id,
              name: company.name,
            }))}
          />
          <AddCompany />
        </div>
      </InputGroup>
      <FormInputSelect
        id="serviceCoordinator"
        name="assignedTo"
        label="SERVICE COORDINATOR"
        control={control}
        options={engineers.map((engineer: any) => ({
          id: engineer.id,
          name: engineer.fullname,
        }))}
      />
      <InputGroup>
        {mode === "edit" && (
          <FormInputText name="poNumber" label="PO NUMBER" control={control} />
        )}
        <FormInputText
          name="targetPort"
          label="TARGET PORT"
          control={control}
          className={clsx(mode === "create" && "col-span-2")}
        />
        <FormInputDate name="vesselEta" label="VESSEL ETA" control={control} />
      </InputGroup>
      <FormInputAutoComplete
        title="services"
        label="SERVICES"
        options={services}
        control={control}
      />
      <InputGroup inputs={mode === "edit" ? 2 : 1}>
        {mode === "edit" && (
          <FormInputText
            name="description"
            label="DESCRIPTION"
            control={control}
          />
        )}
        <FormInputSelect
          id="natureOfJob"
          name="type"
          label="NATURE OF JOB"
          control={control}
          options={[
            { id: "SPARES SUPPLY", name: "Spare Supply" },
            { id: "SERVICES", name: "Services" },
          ]}
        />
      </InputGroup>
      {mode === "edit" && (
        <div className="flex gap-1">
          <FormInputSelect
            id="agent"
            name="agentId"
            label="AGENT"
            control={control}
            options={[]}
          />
          <AddAgent />
        </div>
      )}
      {mode === "edit" ? (
        <div className="flex gap-4 mt-4">
          <Button
            type="submit"
            variant="contained"
            className="bg-green-600 hover:bg-green-700/90"
          >
            Update Job
          </Button>
          <Button
            type="button"
            variant="contained"
            className="bg-primary-bright-blue"
          >
            Mark Job as Completed
          </Button>
          <Button
            type="button"
            variant="contained"
            className="bg-red-600 hover:bg-red-700/90"
          >
            Cancel Job
          </Button>
        </div>
      ) : (
        <Button
          type="submit"
          variant="contained"
          className="bg-green-600 hover:bg-green-700/90"
        >
          Create Job
        </Button>
      )}
    </form>
  );
};

export default JobOrderForm;
