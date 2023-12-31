import Button from "@/components/atoms/button";
import FormInputAutoComplete from "@/components/atoms/input/auto-complete";
import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoFilter } from "react-icons/io5";

export type VendorFilterType = {
  category?: (vendor: VendorType) => boolean;
};

const VendorFilters = ({
  setFilters,
}: {
  setFilters: (filters: VendorFilterType) => void;
}) => {
  const [filters, showFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const { control, watch } = useForm({
    defaultValues: {
      category: [],
    },
  });

  const selectedCategories = watch("category") as ServiceType[];
  useEffect(() => {
    console.log({ selectedCategories });
    setFilters({
      category: (vendor) => {
        if (selectedCategories.length === 0) return true;
        const vendorCategories = vendor.services.map((service) => service.id);
        return selectedCategories.some((category) =>
          vendorCategories.includes(category.id)
        );
      },
    });
  }, [selectedCategories]);

  useEffect(() => {
    instance
      .get("/services?pagination[page]=1&pagination[pageSize]=1000")
      .then((res) => {
        setCategories(parseAttributes(res.data.data));
      });
  }, []);

  return (
    <>
      <button
        className="flex mb-3 border gap-1 items-center px-2 py-1 hover:bg-gray-200 rounded-md w-max"
        onClick={() => showFilters(!filters)}
      >
        <IoFilter />
        Filters
      </button>
      {filters && (
        <FormInputAutoComplete
          label="Category"
          options={categories}
          control={control}
          title="category"
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      )}
    </>
  );
};

export default VendorFilters;
