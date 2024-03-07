import Controller from "@/utils/useForm/Controller";
import { FC, ComponentPropsWithoutRef } from "react";
import { Input } from "antd/lib";
import { FieldValues } from "react-hook-form";

type ControlledInput = {
  name: string;
  rules?: FieldValues;
  control: FieldValues;
  placeholder?: string;
} & ComponentPropsWithoutRef<any>;

const ControlledInput: FC<ControlledInput> = ({
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

export default ControlledInput;
