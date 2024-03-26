"use client";
import { useQuery } from "react-query";
import { userSettings } from "@/app/services/settings";
import { ConfigurationsUserType } from "@/types/apis/configurations";

type UseSettingsHook = {
  isLoading: boolean;
  settings: ConfigurationsUserType | undefined;
};

const useSettings = (initialData: ConfigurationsUserType): UseSettingsHook => {
  const { isLoading, data, error } = useQuery<{ data: ConfigurationsUserType }>(
    {
      queryKey: ["settings"],
      queryFn: userSettings,
      initialData: { data: initialData },
    },
  );
  if (error) {
    throw error;
  }

  const settings = data?.data;

  return { isLoading, settings };
};

export default useSettings;
