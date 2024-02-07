import { IconButton, Typography } from "@mui/material";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  loading?: boolean;
  files?: FileList | null;
  handleFilesDelete: () => void;
}

const MultiFileInput = ({
  onChange,
  label,
  loading,
  files,
  handleFilesDelete,
}: Props) => {
  console.log({ files });
  return (
    <label className="flex flex-col gap-2" htmlFor="upload">
      <div className="border-2 border-gray-400 h-36 w-full border-dotted flex flex-col items-center justify-center">
        {loading ? (
          <div className="flex gap-2 items-center">
            <span>Loading...</span>
          </div>
        ) : !files ? (
          <div className="flex gap-2 items-center">
            <span>Upload</span>
            <input
              id="upload"
              type="file"
              multiple
              className="hidden"
              onChange={onChange}
            />
          </div>
        ) : (
          <div
            className={`grid grid-cols-${files.length} w-full p-3 rounded-md gap-3 relative`}
          >
            <div className="absolute w-full h-full bg-black bg-opacity-20 z-10 rounded-md flex items-center justify-center">
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  handleFilesDelete();
                }}
                className="hover:text-red-500 cursor-pointer"
              >
                <MdDelete />
              </IconButton>
            </div>
            {Array.from(files).map((file, index) => (
              <div
                className="flex relative flex-col border items-center overflow-x-hidden h-28 w-full justify-center rounded-md gap-1"
                key={index}
              >
                <FaFilePdf />
                <Typography variant="caption">{file.name}</Typography>
              </div>
            ))}
          </div>
        )}
      </div>
    </label>
  );
};

export default MultiFileInput;
