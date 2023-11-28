import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

interface TagInputProps {
  label?: string;
}
const TagInput: React.FC<TagInputProps> = ({ label }) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="gap-2 flex flex-col">
      {label && (
        <label htmlFor="emails" className="text-sm text-left font-semibold">
          {label}
        </label>
      )}
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="job-description"
        placeHolder="Job Description"
      />
    </div>
  );
};

export default TagInput;
