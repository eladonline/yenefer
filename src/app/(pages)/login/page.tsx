"use client";
import useLogin from "./lib/useLogin";
import Form from "./lib/Form";
import { FormProvider } from "react-hook-form";
import { NextPage } from "next";
import PrimaryError from "@/app/components/errors/PrimaryError";
import { Typography } from "antd/lib";
import React from "react";

type PageProps = {
  searchParams: { reject: string };
};

const Login: NextPage<PageProps> = (props) => {
  const { onSubmit, formFactory } = useLogin();

  const reject = Object(props.searchParams).hasOwnProperty("reject");

  return (
    <div className={"p-3 pt-11 flex  flex-col items-center gap-3"}>
      {reject && (
        <PrimaryError className={"text-xl"} text={"You are unauthorized"} />
      )}
      <div
        className={
          "flex flex-col pt-11 justify-self-center bg-white px-5  rounded-lg"
        }
      >
        <header className={"self-center"}>
          <Typography.Title className={"[&.ant-typography]:text-blue-500 pb-5"}>
            Login
          </Typography.Title>
        </header>

        <FormProvider {...formFactory}>
          <Form onSubmit={formFactory.handleSubmit(onSubmit)} />
        </FormProvider>
        <div className={"pb-2 z-1 relative w-max"}>
          <Typography.Link href={"/sign-up"}>Create Account</Typography.Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
