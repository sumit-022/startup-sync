import React from "react";
import { useForm } from "react-hook-form";
import instance from "@/config/axios.config";
import { TiTick } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import FormInputDate from "@/components/atoms/input/date";
import FormInputSelect from "@/components/atoms/input/select";
import { FormControl, IconButton } from "@mui/material";

const FilterForm = () => {
  const { handleSubmit, control, reset } = useForm<{
    queriedFrom: Date | null;
    queriedUpto: Date | null;
    quotedFrom: Date | null;
    quotedUpto: Date | null;
    type: number | null;
    serviceCordinatorId: number | null;
  }>({
    defaultValues: {
      queriedFrom: null,
      queriedUpto: null,
      quotedFrom: null,
      quotedUpto: null,
      type: null,
      serviceCordinatorId: null,
    },
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <FormControl className="grid grid-cols-[1fr,1fr,1fr,auto] gap-4 place-items-center">
      <div className="flex flex-col gap-2">
        <FormInputDate
          name="queriedFrom"
          label="Queried From"
          control={control}
        />
        <FormInputDate
          name="queriedUpto"
          label="Queried Upto"
          control={control}
        />
      </div>
      <div className="flex flex-col gap-2">
        <FormInputDate
          name="quotedFrom"
          label="Quoted From"
          control={control}
        />
        <FormInputDate
          name="quotedUpto"
          label="Quoted Upto"
          control={control}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <FormInputSelect
          className="w-full"
          name="type"
          label="Nature of Job"
          control={control}
          fetchFunction={async () => [
            { id: 1, name: "Services" },
            { id: 2, name: "Spare Supply" },
          ]}
          id="status"
        />
        <FormInputSelect
          name="serviceCordinatorId"
          label="Service Cordinator"
          control={control}
          fetchFunction={async () => {
            const { data } = await instance.get("/users");
            return data.map((user: any) => ({
              id: user.id,
              name: user.fullname,
            }));
          }}
          id="engineer"
        />
      </div>

      <div className="flex flex-col gap-2">
        <IconButton
          aria-label="apply"
          size="medium"
          className="hover:bg-transparent"
          onClick={handleSubmit(onSubmit)}
        >
          <TiTick className="text-2xl text-green-700" />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="medium"
          className="hover:bg-transparent"
          onClick={() => {
            reset();
          }}
        >
          <MdDelete className="text-2xl text-red-700" />
        </IconButton>
      </div>
    </FormControl>
  );
};

export default FilterForm;
