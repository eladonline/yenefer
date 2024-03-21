"use client";
import React from "react";
import QueryClientProvider from "@/utils/Providers/QueryClientProvider";
import useFormsSettings from "@/app/(pages)/settings/user/lib/useFormsSettings";

const Form = () => {
  const { settings } = useFormsSettings();
  const user = settings?.user;

  return (
    <QueryClientProvider>
      <div className={"flex flex-col"}>{user?.name}</div>
    </QueryClientProvider>
  );
};
export default Form;
