"use client";
import { useQuery } from "react-query";
import { userSettings } from "@/app/services/settings";

const useFormsSettings = () => {
  const { isLoading, data, error } = useQuery("settings", userSettings);

  if (error) {
    throw error;
  }
  console.log(data);
  return { isLoading, data };
};

export default useFormsSettings;
