import clsx from "clsx";
import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

interface TagInputProps {
  label?: string;
  className?: string;
}
const TagInput: React.FC<TagInputProps> = ({ label, className }) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className={clsx("gap-2 flex flex-col", className)}>
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="job-description"
        placeHolder={label ? label : "Add a tag"}
        classNames={{
          input: "p-3",
          tag: "!bg-primary-bright-blue text-white !rounded-none !px-3 !py-[6px] !rounded",
        }}
      />
    </div>
  );
};

export default TagInput;
