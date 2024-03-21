"use client";
import React from "react";
import useFormsSettings from "@/app/(pages)/settings/user/lib/useFormsSettings";
import QueryClientProvider from "@/utils/Providers/QueryClientProvider";

const Page = () => {
  const { data } = useFormsSettings();
  return (
    <QueryClientProvider>
      <div className={"flex flex-col"}>{data}</div>
    </QueryClientProvider>
  );
};
export default Page;
