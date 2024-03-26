"use client";
import { useQuery } from "react-query";
import { userSettings } from "@/app/services/settings";
import { SettingsUserType } from "@/types/apis/settings";

type UseSettingsHook = {
  isLoading: boolean;
  settings: SettingsUserType | undefined;
};

const useSettings = (initialData: SettingsUserType): UseSettingsHook => {
  const { isLoading, data, error } = useQuery<{ data: SettingsUserType }>({
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
