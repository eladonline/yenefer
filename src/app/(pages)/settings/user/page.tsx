import React from "react";
import Form from "@/app/(pages)/settings/user/lib/Form";
import Title from "antd/lib/typography/Title";

const Page = async () => {
  return (
    <div className={"p-5 grid justify-center grid-cols-1 md:grid-cols-[80%] "}>
      <header className={"text-center mb-4"}>
        <Title level={2}>User settings</Title>
      </header>
      <Form />
    </div>
  );
};
export default Page;
