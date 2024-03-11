import { FieldValues, useFormContext, useFormState } from "react-hook-form";
import React, { BaseSyntheticEvent, FC } from "react";
import { SignInCredentials } from "@/app/(pages)/sign-up/lib/useSignUp";
import Field from "@/app/components/decorators/form/Field";
import ControlledInput from "@/utils/useForm/Controlled";
import _get from "lodash/get";
import PrimaryError from "@/app/components/errors/PrimaryError";
import { Button } from "antd/lib";

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

      {formState?.errors?.["formError"] && (
        <PrimaryError
          className={"justify-self-center"}
          text={formError as string}
        />
      )}

      <div className={"relative top-[15px] grid"}>
        <SubmitButton control={control} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const SubmitButton: FC<FieldValues> = ({ onSubmit, control }) => {
  const { isSubmitting } = useFormState({ control });
  return (
    <Button
      type={"primary"}
      onClick={onSubmit}
      className={"justify-self-center w-[100px] h-[40px]"}
      loading={isSubmitting}
    >
      Create
    </Button>
  );
};

export default Form;
