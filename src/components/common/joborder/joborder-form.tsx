import AddCompany from "./joborder-addcompany";
import AddAgent from "./joborder-addagent";
import instance from "@/config/axios.config";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@mui/material";
import clsx from "clsx";
import InputGroup from "@/components/atoms/input/input-group";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import getServices from "@/utils/getServices";
import FormInputText from "@/components/atoms/input/text";
import FormInputDate from "@/components/atoms/input/date";
import FormInputSelect from "@/components/atoms/input/select";
import FormInputAutoComplete from "@/components/atoms/input/auto-complete";
import { toast } from "react-toastify";
import parseAttributes from "@/utils/parse-data";
import { getEngineers } from "@/utils/getEngineers";
import LoadingButton from "@mui/lab/LoadingButton";
import getCompanies from "@/utils/getCompanies";
import FormInputFile from "@/components/atoms/input/file";

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
  const [modal, setModal] = React.useState<"confirmation" | "cancel" | null>(
    null
  );
  const [upload, setUpload] = React.useState<File | null>(null);
  const [companies, setCompanies] = React.useState([]);
  const [loading, setLoading] = useState<"create" | "edit" | "cancel" | null>(
    null
  );
  const [uploadLoader, setUploadLoader] = useState(false);
  const [uploadedData, setUploadedData] = useState<
    Record<string, any> | undefined
  >(data?.serviceReport);

  const handleUploadDelete = async () => {
    setUploadLoader(true);
    if (!uploadedData) {
      toast.error("No file to delete", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        pauseOnHover: true,
      });
      setUploadLoader(false);
      return null;
    }
    instance
      .delete(`/upload/files/${uploadedData.id}`)
      .then(() => {
        toast.success("Upload Deleted Successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          pauseOnHover: true,
        });
        setUploadLoader(false);
        callback && callback();
      })
      .catch(() => {
        toast.error("Upload Deletion Failed", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          pauseOnHover: true,
        });
        setUploadLoader(false);
        setModal(null);
        onClose && onClose();
        callback && callback();
      });
  };

  const handleUpload = async (upload: File | null) => {
    setUploadLoader(true);
    if (!upload) {
      toast.error("No file selected", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        pauseOnHover: true,
      });
      setUploadLoader(false);
      return null;
    }

    const f = new FormData();
    f.append("files", upload);
    f.append("refId", data.id);
    f.append("ref", "api::job.job");
    f.append("field", "serviceReport");
    try {
      const data = await instance.post("/upload", f);
      toast.success("Upload Successful", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        pauseOnHover: true,
      });
      setUploadLoader(false);
      callback && callback();
      return data.data[0];
    } catch (err) {
      toast.error("Upload Failed", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        pauseOnHover: true,
      });
      setUploadLoader(false);
      setModal(null);
      onClose && onClose();
      callback && callback();
      return null;
    }
  };

  const { handleSubmit, control, trigger } = useForm<JobFormType>({
    defaultValues: (data && {
      ...data,
      company: data?.company?.id,
      assignedTo: data?.assignedTo?.id,
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
    getCompanies().then((data: any) => {
      const parsedData = parseAttributes(data);
      setCompanies(parsedData);
    });
  }, []);

  const onSubmit = (data: any) => {
    if (mode === "create") {
      setLoading("create");
      trigger().then((res) => {
        setLoading("create");
        if (!res) return;
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
            callback();
          })
          .finally(() => {
            setLoading(null);
            callback();
            onClose && onClose();
          });
      });
    } else if (mode === "edit") {
      setLoading("edit");
      let jobstatus = "QUERYRECEIVED";
      if (data.quotedAt) jobstatus = "QUOTEDTOCLIENT";
      if (data.poNumber) jobstatus = "ORDERCONFIRMED";
      instance
        .put(`/jobs/${data.id}`, {
          data: {
            ...data,
            services: data.services.map((service: any) => service.id),
            status: jobstatus,
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
          setLoading(null);
        });
    }
  };

  const handleCancel = (id: number) => () => {
    setLoading("cancel");
    instance
      .put(`/jobs/${id}`, {
        data: {
          status: "JOBCANCELLED",
        },
      })
      .then(() => {
        toast.success("Job Cancelled Successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          pauseOnHover: true,
        });
        setModal(null);
        onClose && onClose();
        callback && callback();
      })
      .catch(() => {
        toast.error("Job Cancellation Failed", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          pauseOnHover: true,
        });
        setModal(null);
        onClose && onClose();
        callback && callback();
      })
      .finally(() => {
        setLoading(null);
      });
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
          rules={{
            required: {
              value: true,
              message: "Please select a date",
            },
          }}
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
        disabled
      />
      <div className="flex gap-4">
        {mode === "edit" && (
          <FormInputText name="poNumber" label="PO NUMBER" control={control} />
        )}
        <FormInputText
          name="targetPort"
          label="TARGET PORT"
          control={control}
        />
      </div>
      <FormInputDate name="vesselETA" label="VESSEL ETA" control={control} />
      <FormInputAutoComplete
        title="services"
        label="SERVICES"
        options={services}
        control={control}
        rules={{
          required: {
            value: true,
            message: "Please select at least one service",
          },
        }}
      />
      <InputGroup inputs={mode === "edit" ? 2 : 1}>
        <FormInputText
          name="description"
          label="DESCRIPTION"
          control={control}
        />
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
        <div className="grid grid-cols-[1fr,auto]">
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
      {mode === "edit" && (
        <FormInputFile
          label="Upload Service Report Here"
          onChange={async (e) => {
            if (!e.target.files) return;
            if (e.target.files[0].type !== "application/pdf") {
              toast.error("Please upload a PDF file", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                pauseOnHover: true,
              });
              return;
            }
            setUpload(e.target.files[0]);
            const uploadedData = await handleUpload(e.target.files[0]);
            if (uploadedData) setUploadedData(uploadedData);
          }}
          fileData={uploadedData}
          handleRemove={() => handleUploadDelete()}
          loading={uploadLoader}
          file={upload}
        />
      )}
      {mode === "edit" ? (
        <div className="flex gap-4 mt-4">
          <LoadingButton
            loading={loading === "edit"}
            type="submit"
            variant="contained"
            className="bg-green-600 hover:bg-green-700/90"
          >
            Update Job
          </LoadingButton>
          <Button
            type="button"
            variant="contained"
            className="bg-primary-bright-blue"
            onClick={() => setModal("confirmation")}
          >
            Mark Job as Completed
          </Button>
          <Button
            type="button"
            variant="contained"
            className="bg-red-600 hover:bg-red-700/90"
            onClick={() => setModal("cancel")}
          >
            Cancel Job
          </Button>
        </div>
      ) : (
        <LoadingButton
          loading={loading === "create"}
          type="submit"
          variant="contained"
          className="bg-green-600 hover:bg-green-700/90"
        >
          Create Job
        </LoadingButton>
      )}
      <Dialog
        open={Boolean(modal)}
        maxWidth="xs"
        onClose={() => setModal(null)}
        aria-labelledby="job-completed-dialog-title"
      >
        <DialogTitle id="job-completed-dialog-title">
          {modal === "confirmation"
            ? "Mark Job as Completed"
            : "Cancel Job Confirmation"}
        </DialogTitle>
        <DialogContent>
          {!upload && modal === "confirmation" && (
            <DialogContentText>
              Are you sure you want to mark this job as completed without
              uploading a service report?
            </DialogContentText>
          )}
          {modal === "cancel" && (
            <DialogContentText>
              Are you sure you want to cancel this job?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModal(null)}>Cancel</Button>
          <Button
            onClick={
              modal === "confirmation"
                ? handleSubmit(onSubmit)
                : data && handleCancel(data.id)
            }
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default JobOrderForm;
