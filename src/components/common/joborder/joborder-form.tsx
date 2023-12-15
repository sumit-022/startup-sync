import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import { TextField } from "@mui/material";
import SelectInput from "@/components/atoms/select";
import TagInput from "@/components/atoms/tag";
import Modal from "@/components/atoms/modal";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface JobOrderFormProperties {
  mode: "edit" | "create" | "view";
  options?: string[];
}

const JobOrderForm: React.FC<JobOrderFormProperties> = ({ mode, options }) => {
  const { authData } = useAuth();
  const [modal, setModal] = React.useState(false);
  const [option, setOption] = React.useState<string | null>(null);
  const [upload, setUpload] = React.useState(false);

  const [job, setJob] = React.useState<JobType>({
    jobCode: "",
    recievedAt: new Date(),
    quotedAt: null,
    shipName: "",
    company: "",
    description: "",
    targetPort: "",
    cancelReason: "",
    invoiceDate: null,
    services: [],
    spares: [],
    vesselETA: "",
    serviceCordinator: "",
    agent: "",
  });

  useEffect(() => {
    if (mode === "create") {
      setJob({ ...job, serviceCordinator: authData?.fullname });
    }
  }, [authData?.fullname]);

  const jobCode = "2023-SE-001";
  return (
    <form
      action=""
      onSubmit={() => {}}
      className="flex flex-col gap-4 text-black"
    >
      <h1 className="text-left font-bold text-lg uppercase">
        {mode === "edit"
          ? "Edit a Job"
          : mode === "create"
          ? "Create a Job"
          : "Job Details"}
      </h1>
      <div className="grid grid-cols-3 gap-6 items-end">
        <Input
          placeholder="Job Code"
          label="Job Code"
          value={jobCode}
          disabled
        />
        <Input
          type="date"
          label="Query recieved on"
          value={job.recievedAt}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setJob({ ...job, recievedAt: e.target.value })}
        />
        <Input
          type="date"
          label="Quotation Date"
          value={job.quotedAt}
          onChange={(e: any) => {
            console.log(e.$d.toLocaleDateString());
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-6 items-end">
        <Input
          placeholder="Ship Name"
          label="Ship Name"
          value={job.shipName}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setJob({ ...job, shipName: e.target.value })}
        />
        <SelectInput
          label="Company Name"
          placeholder="Company Name"
          options={["Company 1", "Company 2", "Company 3"]}
          value={job.company}
          onChange={(e) => setJob({ ...job, company: e.target.value })}
        />
        <SelectInput
          label="Service Coordinator"
          placeholder="Engineer"
          options={["Engineer 1", "Engineer 2", "Engineer 3", "Sumit Raj"]}
          value={job.serviceCordinator}
          onChange={(e) =>
            setJob({ ...job, serviceCordinator: e.target.value })
          }
        />
      </div>
      <div className="grid grid-cols-3 gap-6 items-end">
        <Input placeholder="PO Number" label="PO Number" />
        <Input placeholder="Target Port" label="Target Port" />
        <Input type="date" label="Vessel ETA" />
      </div>
      <TagInput label="Job Description" />
      <div className="grid grid-cols-2 gap-4 items-end">
        <Input placeholder="Description" label="Description" />
        <SelectInput
          label="Nature of Job"
          placeholder="Nature of Job"
          options={["Spare Supply", "Services"]}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 items-end">
        <div className="flex gap-1 items-center">
          <TagInput label="Spares" className="flex-1" />
          <label
            htmlFor="spares"
            className="text-sm text-primary-bright-blue cursor-pointer text-left font-semibold"
          >
            Upload CSV File
          </label>
          <Input type="file" id="spares" className="sr-only" />
        </div>
        <SelectInput
          label="Agent"
          placeholder="Agent"
          options={["Agent 1", "Agent 2", "Agent 3"]}
          value={job.company}
        />
      </div>
      {upload && (
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="Completion Date"
            value={job.invoiceDate}
            onChange={(e: any) =>
              setJob({ ...job, invoiceDate: e.target.value })
            }
          />
          <Input type="date" label="Invoice Date" />
        </div>
      )}

      {upload == false && (
        <div className="flex gap-4">
          {options?.map((option, index) =>
            option === "cancel" ? (
              <Button className="bg-red-600" key={index}>
                Cancel Job
              </Button>
            ) : option === "save" ? (
              <Button className="bg-green-700">Save Job</Button>
            ) : option === "create" ? (
              <Button className="bg-green-500">Create Job</Button>
            ) : option === "cancel" ? (
              <Button className="bg-red-600">Cancel Job</Button>
            ) : (
              <Button
                className="rounded-md px-3 font-semibold text-white"
                onClick={() => setModal(true)}
              >
                Mark Job as Completed
              </Button>
            )
          )}
        </div>
      )}
      {option === "not-completed" && (
        <Button className="bg-green-500" onClick={() => setOption("completed")}>
          Upload Proof of Delivery
        </Button>
      )}
      <Modal active={modal} setActive={setModal} clickOutside={false}>
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold">Service Report Present?</h1>
          <p className="text-sm">
            Do you have the service report or Delivery Note for this job?
          </p>
          <div className="flex gap-4 justify-center items-center">
            <Button
              className="bg-green-500"
              type="button"
              onClick={() => {
                setOption("completed");
                setModal(false);
              }}
            >
              Yes
            </Button>
            <Button
              className="bg-red-600"
              type="button"
              onClick={() => {
                setOption("not-completed");
                setModal(false);
              }}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        active={option === "completed"}
        setActive={() => setOption(null)}
        clickOutside={false}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold">Job Completed</h1>
          <p className="text-sm">
            Job has been marked as completed. You can now upload the proof of
            delivery.
          </p>
          <div className="flex gap-4 justify-center items-center">
            <Input type="file" label="Proof of Delivery" />
          </div>
          <div className="flex gap-4 justify-center items-center">
            <Button
              className="bg-green-500"
              type="button"
              onClick={() => {
                setUpload(true);
                setOption(null);
              }}
            >
              Upload
            </Button>
            <Button
              className="bg-red-600"
              type="button"
              onClick={() => {
                setOption(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </form>
  );
};

export default JobOrderForm;
