import Controller from "@/utils/hooks/useForm/Controller";
import { FC, ComponentPropsWithoutRef } from "react";
import { Input, InputNumber } from "antd/lib";
import { FieldValues } from "react-hook-form";

const { TextArea } = Input;

type ControlledInput = {
  name: string;
  rules?: FieldValues;
  control: FieldValues;
  placeholder?: string;
} & ComponentPropsWithoutRef<any>;

export const ControlledInput: FC<ControlledInput> = ({
  name,
  rules,
  control,
  placeholder = "Type Here",
  ...props
}) => {
  return (
    <Controller name={name} control={control} rules={rules}>
      <Input name={name} placeholder={placeholder} {...props} />
    </Controller>
  );
};

type ControlledInputNumber = {
  name: string;
  rules?: FieldValues;
  control: FieldValues;
  placeholder?: string;
} & ComponentPropsWithoutRef<any>;

export const ControlledInputNumber: FC<ControlledInputNumber> = ({
  name,
  rules,
  control,
  placeholder = "Type Here",
  ...props
}) => {
  return (
    <Controller name={name} control={control} rules={rules}>
      <InputNumber name={name} placeholder={placeholder} {...props} />
    </Controller>
  );
};

export const ControlledTextArea: FC<ControlledInput> = ({
  name,
  rules,
  control,
  placeholder = "Type Here",
  ...props
}) => {
  return (
    <Controller name={name} control={control} rules={rules}>
      <TextArea name={name} placeholder={placeholder} {...props} />
    </Controller>
  );
};
