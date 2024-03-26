import React from "react";
import Form from "@/app/(pages)/settings/user/lib/Form";
import Title from "antd/lib/typography/Title";
import { headers } from "next/headers";
import { endpoints } from "@/app/services/settings";
import ServerApi from "@/app/services/ServerApi";
import { SettingsUserType } from "@/types/apis/configurations";

const Page = async () => {
  const serverApi = new ServerApi();

  const data: SettingsUserType = await serverApi.get(endpoints.user, {
    headers: {
      id: headers().get("id") as string,
    },
  });

  return (
    <div className={"p-5 grid justify-center grid-cols-1 md:grid-cols-[80%] "}>
      <header className={"text-center mb-4"}>
        <Title level={2}>User settings</Title>
      </header>
      {data && <Form data={data} />}
    </div>
  );
};
export default Page;
