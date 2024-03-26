"use client";
import { useQuery } from "react-query";
import { userSettings } from "@/app/services/settings";
import { SettingsDataType } from "@/app/(pages)/settings/user/lib/Form";

type UseSettingsHook = {
  isLoading: boolean;
  settings: SettingsDataType | undefined;
};

const useSettings = (initialData: SettingsDataType): UseSettingsHook => {
  const { isLoading, data, error } = useQuery<{ data: SettingsDataType }>({
    queryKey: ["settings"],
    queryFn: userSettings,
    initialData: { data: initialData },
  });
  if (error) {
    throw error;
  }

  const settings = data?.data;

  return { isLoading, settings };
};

export default useSettings;
