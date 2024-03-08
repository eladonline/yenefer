import Field from "@/app/components/decorators/form/Field";
import ControlledInput from "@/utils/useForm/Controlled";
import PrimaryError from "@/app/components/errors/PrimaryError";
import { FC } from "react";
import { FieldValues, useFormContext, useFormState } from "react-hook-form";
import { Button } from "antd/lib";
import _get from "lodash/get";

type FormType = {
  onSubmit: Function;
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
          placeholder="username"
          onChange={() => formError && clearErrors("formError")}
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
          onChange={() => formError && clearErrors("formError")}
        />
      </Field>
      {formState?.errors?.["formError"] && (
        <PrimaryError
          className={"justify-self-center"}
          text={formError as string}
        />
      )}

      <SubmitButton control={control} onSubmit={onSubmit} />
    </div>
  );
};

const SubmitButton: FC<FieldValues> = ({ onSubmit, control }) => {
  const { isSubmitting } = useFormState({ control });
  return (
    <Button
      type={"primary"}
      onClick={onSubmit}
      className={"justify-self-center w-[200px]"}
      loading={isSubmitting}
    >
      Login
    </Button>
  );
};

export default Form;
