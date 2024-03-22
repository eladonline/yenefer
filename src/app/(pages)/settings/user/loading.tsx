import { Skeleton } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";

export default function Loading() {
  return (
    <div className={"p-5 grid justify-center grid-cols-1 md:grid-cols-[80%] "}>
      <header className={"text-center mb-4"}>
        <Title level={2}>User settings</Title>
      </header>
      <div className={"p-5 bg-white rounded"}>
        <Skeleton round active />
      </div>
    </div>
  );
}
