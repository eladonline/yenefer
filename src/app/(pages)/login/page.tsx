"use client";
import useLogin from "./lib/useLogin";
import Field from "@/app/components/decorators/form/Field";
import ControlledInput from "@/utils/useForm/Controlled";
import PrimaryError from "@/app/components/errors/PrimaryError";
import { Button } from "antd/lib";

function Login() {
  const {
    onSubmit,
    onError,
    formFactory: { handleSubmit, formState, control, clearErrors },
  } = useLogin();

  return (
    <div className={"p-3 pt-11 flex  flex-col items-center gap-3"}>
      <Field
        label={{ text: "Username" }}
        error={{ text: formState?.errors?.username?.message }}
      >
        <ControlledInput
          control={control}
          rules={{ required: "Required" }}
          name={"username"}
          className={"w-min"}
          placeholder="username"
          onChange={() => clearErrors("formError")}
        />
      </Field>
      <Field
        label={{ text: "Password" }}
        error={{ text: formState?.errors?.password?.message }}
      >
        <ControlledInput
          rules={{ required: "Required" }}
          control={control}
          name={"password"}
          className={"w-min"}
          onChange={() => clearErrors("formError")}
        />
      </Field>

      {formState?.errors?.["formError"] && (
        <PrimaryError text={String(formState.errors["formError"].message)} />
      )}
      <Button
        type={"primary"}
        onClick={handleSubmit(onSubmit, onError)}
        className={"p-1 border border-amber-500"}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
