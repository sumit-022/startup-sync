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
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  data?: any;
  callback: any;
}

const JobOrderForm: React.FC<JobOrderFormProperties> = ({
  mode,
  authData,
  setShowModal,
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

  const { handleSubmit, control } = useForm<JobFormType>({
    defaultValues: (data && {
      ...data,
      assignedTo: data.assignedTo.id,
      company: data.company.id,
    }) || {
      assignedTo: authData?.id,
    },
  });

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
          setShowModal && setShowModal(false);
          callback();
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
          callback && callback();
          setShowModal && setShowModal(false);
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
      <InputGroup>
        <FormInputText name="shipName" label="SHIP NAME" control={control} />
        <div className="flex gap-1">
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
        <FormInputSelect
          id="serviceCoordinator"
          name="assignedTo"
          label="SERVICE COORDINATOR"
          control={control}
          options={engineers.map((engineer: any) => ({
            id: engineer.id,
            name: engineer.attributes.name,
          }))}
          disabled
        />
      </InputGroup>
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
  // return (
  //   <form
  //     action=""
  //     onSubmit={() => {}}
  //     className="flex flex-col gap-4 text-black"
  //   >
  //     <h1 className="text-left font-bold text-lg uppercase">
  //       {mode === "edit"
  //         ? "Edit a Job"
  //         : mode === "create"
  //         ? "Create a Job"
  //   TextField
  //     </h1>
  //     <div className="grid grid-cols-3 gap-6 items-end">
  //       <Input
  //         placeholder="Job Code"
  //         label="Job Code"
  //         value={jobCode}
  //         disabled
  //       />
  //       <Input
  //         type="date"
  //         label="Query recieved on"
  //         value={job.recievedAt}
  //         onChange={(
  //           e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //         ) => setJob({ ...job, recievedAt: e.target.value })}
  //       />
  //       <Input
  //         type="date"
  //         label="Quotation Date"
  //         value={job.quotedAt}
  //         onChange={(e: any) => {
  //           console.log(e.$d.toLocaleDateString());
  //         }}
  //       />
  //     </div>
  //     <div className="grid grid-cols-3 gap-6 items-end">
  //       <Input
  //         placeholder="Ship Name"
  //         label="Ship Name"
  //         value={job.shipName}
  //         onChange={(
  //           e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //         ) => setJob({ ...job, shipName: e.target.value })}
  //       />
  //       <SelectInput
  //         label="Company Name"
  //         placeholder="Company Name"
  //         options={["Company 1", "Company 2", "Company 3"]}
  //         value={job.company}
  //         onChange={(e) => setJob({ ...job, company: e.target.value })}
  //       />
  //       <SelectInput
  //         label="Service Coordinator"
  //         placeholder="Engineer"
  //         options={[
  //           "Engineer 1",
  //           "Engineer 2",
  //           "Engineer 3",
  //           "Sumit Raj",
  //           "Ranjan Tripathi",
  //           "Subash Ranjan",
  //         ]}
  //         value={job.serviceCordinator}
  //         onChange={(e) =>
  //           setJob({ ...job, serviceCordinator: e.target.value })
  //         }
  //       />
  //     </div>
  //     <div className="grid grid-cols-3 gap-6 items-end">
  //       <Input placeholder="PO Number" label="PO Number" />
  //       <Input placeholder="Target Port" label="Target Port" />
  //       <Input type="date" label="Vessel ETA" />
  //     </div>
  //     <TagInput label="Job Description" />
  //     <div className="grid grid-cols-2 gap-4 items-end">
  //       <Input placeholder="Description" label="Description" />
  //       <SelectInput
  //         label="Nature of Job"
  //         placeholder="Nature of Job"
  //         options={["Spare Supply", "Services"]}
  //       />
  //     </div>
  //     <div className="grid grid-cols-2 gap-6 items-end">
  //       <div className="flex gap-1 items-center">
  //         <TagInput label="Spares" className="flex-1" />
  //         <label
  //           htmlFor="spares"
  //           className="text-sm text-primary-bright-blue cursor-pointer text-left font-semibold"
  //         >
  //           Upload CSV File
  //         </label>
  //         <Input type="file" id="spares" className="sr-only" />
  //       </div>
  //       <SelectInput
  //         label="Agent"
  //         placeholder="Agent"
  //         options={["Agent 1", "Agent 2", "Agent 3"]}
  //         value={job.company}
  //       />
  //     </div>
  //     {upload && (
  //       <div className="grid grid-cols-2 gap-4">
  //         <Input
  //           type="date"
  //           label="Completion Date"
  //           value={job.invoiceDate}
  //           onChange={(e: any) =>
  //             setJob({ ...job, invoiceDate: e.target.value })
  //           }
  //         />
  //         <Input type="date" label="Invoice Date" />
  //       </div>
  //     )}

  //     {upload == false && (
  //       <div className="flex gap-4">
  //         {options?.map((option, index) =>
  //           option === "cancel" ? (
  //             <Button className="bg-red-600" key={index}>
  //               Cancel Job
  //             </Button>
  //           ) : option === "save" ? (
  //             <Button className="bg-green-700">Save Job</Button>
  //           ) : option === "create" ? (
  //             <Button className="bg-green-500">Create Job</Button>
  //           ) : option === "cancel" ? (
  //             <Button className="bg-red-600">Cancel Job</Button>
  //           ) : (
  //             <Button
  //               className="rounded-md px-3 font-semibold text-white"
  //               onClick={() => setModal(true)}
  //             >
  //               Mark Job as Completed
  //             </Button>
  //           )
  //         )}
  //       </div>
  //     )}
  //     {option === "not-completed" && (
  //       <Button className="bg-green-500" onClick={() => setOption("completed")}>
  //         Upload Proof of Delivery
  //       </Button>
  //     )}
  //     <Modal active={modal} setActive={setModal} clickOutside={false}>
  //       <div className="flex flex-col gap-4">
  //         <h1 className="text-lg font-bold">Service Report Present?</h1>
  //         <p className="text-sm">
  //           Do you have the service report or Delivery Note for this job?
  //         </p>
  //         <div className="flex gap-4 justify-center items-center">
  //           <Button
  //             className="bg-green-500"
  //             type="button"
  //             onClick={() => {
  //               setOption("completed");
  //               setModal(false);
  //             }}
  //           >
  //             Yes
  //           </Button>
  //           <Button
  //             className="bg-red-600"
  //             type="button"
  //             onClick={() => {
  //               setOption("not-completed");
  //               setModal(false);
  //             }}
  //           >
  //             No
  //           </Button>
  //         </div>
  //       </div>
  //     </Modal>
  //     <Modal
  //       active={option === "completed"}
  //       setActive={() => setOption(null)}
  //       clickOutside={false}
  //     >
  //       <div className="flex flex-col gap-4">
  //         <h1 className="text-lg font-bold">Job Completed</h1>
  //         <p className="text-sm">
  //           Job has been marked as completed. You can now upload the proof of
  //           delivery.
  //         </p>
  //         <div className="flex gap-4 justify-center items-center">
  //           <Input type="file" label="Proof of Delivery" />
  //         </div>
  //         <div className="flex gap-4 justify-center items-center">
  //           <Button
  //             className="bg-green-500"
  //             type="button"
  //             onClick={() => {
  //               setUpload(true);
  //               setOption(null);
  //             }}
  //           >
  //             Upload
  //           </Button>
  //           <Button
  //             className="bg-red-600"
  //             type="button"
  //             onClick={() => {
  //               setOption(null);
  //             }}
  //           >
  //             Cancel
  //           </Button>
  //         </div>
  //       </div>
  //     </Modal>
  //   </form>
  // );
};

export default JobOrderForm;
