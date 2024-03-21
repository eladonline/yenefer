"use client";
import { useQuery } from "react-query";
import { formsSettings } from "@/app/services/settings";

const useFormsSettings = () => {
  const { isLoading, data, error } = useQuery("data", formsSettings);

  if (error) {
    throw error;
  }
  console.log(data);
  return { isLoading, data };
};

export default useFormsSettings;
