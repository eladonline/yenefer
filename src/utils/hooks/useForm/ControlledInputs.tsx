import Controller from "@/utils/hooks/useForm/Controller";
import { FC, ComponentPropsWithoutRef } from "react";
import {
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  Select,
  SelectProps,
  DatePicker,
  DatePickerProps,
  Radio,
  RadioGroupProps,
} from "antd/lib";
import { FieldValues } from "react-hook-form";
import { TextAreaProps } from "antd/lib/input";
import DateController from "@/utils/hooks/useForm/DateController";

const { TextArea } = Input;

type ControlledInputType = {
  name: string;
  rules?: FieldValues;
  control: FieldValues;
  placeholder?: string;
} & InputProps &
  ComponentPropsWithoutRef<any>;

export const ControlledInput: FC<ControlledInputType> = ({
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

type ControlledSelectType = {
  name: string;
  rules?: FieldValues;
  control: FieldValues;
} & SelectProps &
  ComponentPropsWithoutRef<any>;

export const ControlledSelect: FC<ControlledSelectType> = ({
  name,
  rules,
  control,
  placeholder = "Type Here",
  ...props
}) => {
  return (
    <Controller name={name} control={control} rules={rules}>
      <Select className={"w-[100%]"} placeholder={placeholder} {...props} />
    </Controller>
  );
};

type ControlledInputNumberType = {
  name: string;
  rules?: FieldValues;
  control: FieldValues;
  placeholder?: string;
} & InputNumberProps &
  ComponentPropsWithoutRef<any>;

export const ControlledInputNumber: FC<ControlledInputNumberType> = ({
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

type ControlledTextAreaType = {
  name: string;
  rules?: FieldValues;
  control: FieldValues;
  placeholder?: string;
} & TextAreaProps &
  ComponentPropsWithoutRef<any>;

export const ControlledTextArea: FC<ControlledTextAreaType> = ({
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

type ControlledDatePickerType = {
  name: string;
  rules?: FieldValues;
  control: FieldValues;
  placeholder?: string;
} & DatePickerProps &
  ComponentPropsWithoutRef<any>;

export const ControlledDatePicker: FC<ControlledDatePickerType> = ({
  name,
  rules,
  control,
  placeholder = "Select Date",
  ...props
}) => {
  return (
    <DateController name={name} control={control} rules={rules}>
      <DatePicker name={name} placeholder={placeholder} {...props} />
    </DateController>
  );
};

type ControlledRadioType = {
  name: string;
  rules?: FieldValues;
  control: FieldValues;
} & RadioGroupProps &
  ComponentPropsWithoutRef<any>;

export const ControlledRadioGroup: FC<ControlledRadioType> = ({
  name,
  rules,
  control,
  ...props
}) => {
  return (
    <Controller name={name} control={control} rules={rules}>
      <Radio.Group name={name} {...props} />
    </Controller>
  );
};
