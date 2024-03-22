"use client";
import React from "react";
import QueryClientProvider from "@/utils/Providers/QueryClientProvider";
import useFormsSettings from "@/app/(pages)/settings/user/lib/useFormsSettings";
import Text from "antd/lib/typography/Text";
import { Skeleton } from "antd/lib";

const Form = () => {
  const { settings } = useFormsSettings();
  const name = settings?.user?.name || null;

  const fields = [name].map((text: string | null) => {
    return (
      <li key={text} className={"flex items-center gap-2"}>
        <Text className={"[&.ant-typography]:break-keep"} strong>
          Name:
        </Text>

        <Text>
          {text || (
            <Skeleton title={false} paragraph={{ rows: 1, width: 60 }} active />
          )}
        </Text>
      </li>
    );
  });

  return (
    <div className={"p-5 bg-white rounded"}>
      <QueryClientProvider>
        <ul className={"flex-col flex gap-3"}>{fields}</ul>
      </QueryClientProvider>
    </div>
  );
};
export default Form;
