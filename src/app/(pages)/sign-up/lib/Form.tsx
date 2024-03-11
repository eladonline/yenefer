import { useFormContext } from "react-hook-form";
import React, { BaseSyntheticEvent } from "react";
import { SignInCredentials } from "@/app/(pages)/sign-up/lib/useSignUp";
import Field from "@/app/components/decorators/form/Field";
import ControlledInput from "@/utils/useForm/Controlled";
import _get from "lodash/get";

type FormType = {
  onSubmit: (
    data: BaseSyntheticEvent<SignInCredentials> | undefined,
  ) => Promise<void>;
};

const Form: React.FC<FormType> = ({ onSubmit }) => {
  const { control, formState, clearErrors } = useFormContext();
  const formError = _get(formState, "errors.formError.message", "");

  return (
    <div className={"grid gap-4 grid-cols-[400px]"}>
      <Field
        label={{ text: "Username" }}
        error={{ text: formState?.errors?.username?.message as string }}
      >
        <ControlledInput
          control={control}
          rules={{ required: "Required" }}
          name={"username"}
          onChange={() => formError && clearErrors("formError")}
        />
      </Field>

      <Field
        label={{ text: "Password" }}
        error={{ text: formState?.errors?.username?.message as string }}
      >
        <ControlledInput
          control={control}
          rules={{ required: "Required" }}
          name={"password"}
          onChange={() => formError && clearErrors("formError")}
        />
      </Field>

      <Field
        label={{ text: "Confirm Password" }}
        error={{ text: formState?.errors?.username?.message as string }}
      >
        <ControlledInput
          control={control}
          rules={{ required: "Required" }}
          name={"confirm"}
          onChange={() => formError && clearErrors("formError")}
        />
      </Field>
    </div>
  );
};

export default Form;
