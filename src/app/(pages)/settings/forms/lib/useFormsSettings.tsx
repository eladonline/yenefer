"use client";
import { useQuery } from "react-query";
import { formsSettings } from "@/app/services/settings";

const useFormsSettings = () => {
  const { isLoading, data } = useQuery("data", formsSettings);

  console.log(data);
  return { isLoading, data };
};

export default useFormsSettings;
