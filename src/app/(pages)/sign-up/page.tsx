"use client";
import React from "react";
import Form from "./lib/Form";
import { FormProvider } from "react-hook-form";
import useSignUp from "./lib/useSignUp";
import { Title } from "@/app/components/antd-extends/Typography";

const SingIn = () => {
  const { formFactory, onSubmit } = useSignUp();
  return (
    <div className={"p-3 pt-11 flex  flex-col items-center gap-3"}>
      <div
        className={
          "pt-11 justify-self-center bg-white px-5  rounded-lg flex flex-col"
        }
      >
        <header className={"self-center"}>
          <Title className={"!text-blue-500 pb-5"}>Create Account</Title>
        </header>
        <FormProvider {...formFactory}>
          <Form onSubmit={formFactory.handleSubmit(onSubmit)} />
        </FormProvider>
      </div>
    </div>
  );
};
export default SingIn;
