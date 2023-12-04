import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import SelectInput from "@/components/atoms/select";
import TagInput from "@/components/atoms/tag";
import { Checkbox } from "@mui/material";
import React from "react";

interface JobOrderFormProperties {
  mode: "edit" | "create";
  options?: string[];
}

const JobOrderForm: React.FC<JobOrderFormProperties> = ({ mode, options }) => {
  const jobCode = "2023-SE-001";
  return (
    <form action="" className="flex flex-col gap-4 text-black">
      <h1 className="text-left font-bold text-lg uppercase">
        {mode === "edit" ? "Edit a Job" : "Create a Job"}
      </h1>
      <div className="grid grid-cols-3 gap-6 items-end">
        <Input
          placeholder="Job Code"
          label="Job Code"
          value={jobCode}
          disabled
        />
        <Input type="date" label="Query recieved on" />
        <Input type="date" label="Quotation Date" />
      </div>
      <div className="grid grid-cols-3 gap-6 items-end">
        <Input placeholder="Ship Name" label="Ship Name" />
        <SelectInput
          label="Company Name"
          placeholder="Company Name"
          options={["Company 1", "Company 2", "Company 3"]}
        />
        <SelectInput
          label="Service Coordinator"
          placeholder="Engineer"
          options={["Engineer 1", "Engineer 2", "Engineer 3"]}
        />
      </div>
      <div className="grid grid-cols-3 gap-6 items-end">
        <Input placeholder="PO Number" label="PO Number" />
        <Input placeholder="Target Port" label="Target Port" />
        <Input type="date" label="Vessel ETA" />
      </div>
      <TagInput label="Job Description" />
      <div className="grid grid-cols-2 gap-6 items-end">
        <SelectInput
          label="Spares"
          placeholder="Spares"
          options={["Spares 1", "Spares 2", "Spares 3"]}
        />
        <SelectInput
          label="Agent"
          placeholder="Agent"
          options={["Agent 1", "Agent 2", "Agent 3"]}
        />
      </div>

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
            <Button className="bg-green-600">Mark Job as Completed</Button>
          )
        )}
      </div>
    </form>
  );
};

export default JobOrderForm;
