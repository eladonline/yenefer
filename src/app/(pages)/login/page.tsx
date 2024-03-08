"use client";
import useLogin from "./lib/useLogin";
import Form from "@/app/(pages)/login/lib/Form";
import { FormProvider } from "react-hook-form";

function Login() {
  const { onSubmit, formFactory } = useLogin();

  return (
    <div className={"p-3 pt-11 flex  flex-col items-center gap-3 h-[100vh]"}>
      <div className={"justify-self-center bg-white px-5 pt-10 rounded-lg"}>
        <FormProvider {...formFactory}>
          <Form onSubmit={formFactory.handleSubmit(onSubmit)} />
        </FormProvider>
      </div>
    </div>
  );
}

export default Login;
