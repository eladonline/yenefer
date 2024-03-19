"use client";
import React from "react";
import Sort from "@/app/(pages)/settings/forms/lib/Sort";
import View from "@/app/(pages)/settings/forms/lib/View";
import Edit from "@/app/(pages)/settings/forms/lib/Edit";
import useFormsSettings from "@/app/(pages)/settings/forms/lib/useFormsSettings";
import QueryClientProvider from "@/utils/Providers/QueryClientProvider";

const Page = () => {
  const { data } = useFormsSettings();
  return (
    <QueryClientProvider>
      <div className={"flex flex-col"}>
        <Edit />
        <section className={"flex gap-4 justify-between flex-wrap"}>
          <Sort />
          <View />
        </section>
      </div>
    </QueryClientProvider>
  );
};
export default Page;
