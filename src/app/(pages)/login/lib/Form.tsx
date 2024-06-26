import Field from "@/app/components/decorators/form/Field";
import { ControlledInput } from "@/utils/hooks/useForm/ControlledInputs";
import PrimaryError from "@/app/components/errors/PrimaryError";
import { BaseSyntheticEvent, FC } from "react";
import { FieldValues, useFormContext, useFormState } from "react-hook-form";
import { Button } from "antd/lib";
import _get from "lodash/get";
import { Credentials } from "./useLogin";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

type FormType = {
  onSubmit: (
    data: BaseSyntheticEvent<Credentials> | undefined,
  ) => Promise<void>;
};

const Form: FC<FormType> = ({ onSubmit }) => {
  const { control, clearErrors, formState } = useFormContext();

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
          status={formState?.errors?.username && "error"}
          onChange={() => formError && clearErrors("formError")}
          type={"username"}
        />
      </Field>
      <Field
        label={{ text: "Password" }}
        error={{ text: formState?.errors?.password?.message as string }}
      >
        <ControlledInput
          rules={{ required: "Required" }}
          control={control}
          name={"password"}
          status={formState?.errors?.password && "error"}
          onChange={() => formError && clearErrors("formError")}
          type={"password"}
        />
      </Field>
      {formState.errors?.["formError"] && (
        <PrimaryError
          className={"justify-self-center"}
          text={formError as string}
        />
      )}

      <div className={"relative top-[45px] grid"}>
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
      Login
    </Button>
  );
};

export default Form;
