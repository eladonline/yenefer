"use client";
import React, { ReactElement } from "react";
import QueryClientProvider from "@/utils/Providers/QueryClientProvider";
import useSettings from "@/app/(pages)/settings/user/lib/useSettings";
import Text from "antd/lib/typography/Text";
import { Skeleton } from "antd/lib";
import { SettingsUserType } from "@/types/apis/user/configurations";

type FormProps = {
  data: SettingsUserType;
};

const Form: React.FC<FormProps> = ({ data }) => {
  const { user, isLoading } = useSettings(data);
  const userFields: [string, string | number][] = user
    ? Object.entries(user)
    : [];

  const fields: ReactElement[] = userFields.map(
    ([key, value]: [string, string | number]) => {
      key = key.charAt(0).toUpperCase() + key.substring(1);

      return (
        <li key={key} className={"flex items-center"}>
          <Text className={"[&.ant-typography]:break-keep w-[80px]"} strong>
            {key}:
          </Text>

          <Text>
            {isLoading ? (
              <Skeleton
                title={false}
                paragraph={{ rows: 1, width: 60 }}
                active
              />
            ) : (
              value
            )}
          </Text>
        </li>
      );
    },
  );

  return (
    <div className={"p-5 bg-white rounded"}>
      <QueryClientProvider>
        <ul className={"flex-col flex gap-3"}>{fields}</ul>
      </QueryClientProvider>
    </div>
  );
};

export default Form;
