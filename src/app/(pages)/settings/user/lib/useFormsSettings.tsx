"use client";
import { useQuery } from "react-query";
import { userSettings } from "@/app/services/settings";
type Settings = {
  user: { name: string };
};

type SettingsData = {
  data: Settings;
};

type UseFormsSettingsHook = {
  isLoading: boolean;
  settings: Settings | undefined;
};

const useFormsSettings = (): UseFormsSettingsHook => {
  const { isLoading, data, error } = useQuery<SettingsData>({
    queryKey: ["settings"],
    queryFn: userSettings,
  });

  if (error) {
    throw error;
  }
  const settings = data?.data;

  return { isLoading, settings };
};

export default useFormsSettings;
