import React from "react";
import { SubmitHandler, set, useForm } from "react-hook-form";
import instance from "@/config/axios.config";
import { TiTick } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import FormInputDate from "@/components/atoms/input/date";
import FormInputSelect from "@/components/atoms/input/select";
import { FormControl, IconButton } from "@mui/material";

type FilterForm = {
  queriedFrom: Date | null;
  queriedUpto: Date | null;
  quotedFrom: Date | null;
  quotedUpto: Date | null;
  type: JobType["type"] | null;
  assignedTo: number | null;
};

const FilterForm = ({
  setFilters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>;
}) => {
  const { handleSubmit, control, reset } = useForm<FilterForm>({
    defaultValues: {
      queriedFrom: null,
      queriedUpto: null,
      quotedFrom: null,
      quotedUpto: null,
      type: null,
      assignedTo: null,
    },
  });

  const [engineers, setEngineers] = React.useState([]);

  React.useEffect(() => {
    instance.get("/users").then((res) => {
      setEngineers(
        res.data.map((user: any) => ({
          id: user.id,
          name: user.fullname,
        }))
      );
    });
  }, []);

  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    setFilters({
      queriedFrom: ({ receivedAt }) =>
        !data.queriedFrom ||
        (!!receivedAt && new Date(receivedAt) >= data.queriedFrom),
      queriedUpto: ({ receivedAt }) =>
        !data.queriedUpto ||
        (!!receivedAt && new Date(receivedAt) <= data.queriedUpto),
      quotedFrom: ({ quotedAt }) =>
        !data.quotedFrom ||
        (!!quotedAt && new Date(quotedAt) >= data.quotedFrom),
      quotedUpto: ({ quotedAt }) =>
        !data.quotedUpto || !quotedAt || new Date(quotedAt) <= data.quotedUpto,
      type: ({ type }) => {
        return !data.type || (!!type && type === data.type);
      },
      assignedTo: ({ assignedTo }) => {
        return (
          !data.assignedTo ||
          (!!assignedTo && assignedTo.id === data.assignedTo)
        );
      },
    });
  };

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
          name="type"
          id="type"
          label="Job Type"
          control={control}
          options={[
            { id: "SERVICES", name: "Services" },
            { id: "SPARES SUPPLY", name: "Spare Supply" },
          ]}
        />
        <FormInputSelect
          name="assignedTo"
          label="Service Cordinator"
          control={control}
          options={engineers}
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
