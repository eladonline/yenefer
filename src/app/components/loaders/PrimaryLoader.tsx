import React from "react";
import { Spin } from "antd/lib";
import Text from "antd/lib/typography/Text";

const PrimaryLoader = () => {
  return (
    <div
      className={
        "gap-3 z-10 absolute top-0 left-0 h-[100%] flex w-[100%] justify-center pt-[200px] bg-zinc-100/75"
      }
    >
      <Spin />
      <Text>Just a few more seconds...</Text>
    </div>
  );
};
export default PrimaryLoader;
