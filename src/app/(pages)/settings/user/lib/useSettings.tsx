"use client";
import { useQuery } from "react-query";
import { userSettings } from "@/app/services/settings";
import { SettingsUserType } from "@/types/apis/configurations";

type UseSettingsHook = {
  isLoading: boolean;
  user: SettingsUserType | undefined;
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

  const user = data?.data;

  return { isLoading, user };
};

export default useSettings;
