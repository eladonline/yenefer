"use client";
import React from "react";
import Form from "./lib/Form";
import { FormProvider } from "react-hook-form";
import useSignUp from "./lib/useSignUp";
import { Typography } from "antd/lib";

const SingIn = () => {
  const { formFactory, onSubmit } = useSignUp();
  return (
    <div className={"p-3 pt-11 flex  flex-col items-center gap-3"}>
      <div
        className={
          "pt-11 justify-self-center bg-white px-5 rounded-lg flex flex-col"
        }
      >
        <header className={"self-center"}>
          <Typography.Title className={"[&.ant-typography]:text-blue-500 pb-5"}>
            Create Account
          </Typography.Title>
        </header>
        <FormProvider {...formFactory}>
          <Form onSubmit={formFactory.handleSubmit(onSubmit)} />
        </FormProvider>

        <div className={"pb-2 z-1 relative w-max"}>
          <Typography.Link href={"/login"}>Login</Typography.Link>
        </div>
      </div>
    </div>
  );
};
export default SingIn;
