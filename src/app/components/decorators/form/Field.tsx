import { FC, ReactElement } from "react";
import PrimaryError from "@/app/components/errors/PrimaryError";
import { Typography } from "antd/lib";

type FormFieldProps = {
  children: ReactElement;
  required?: boolean;
  label?: { text: string };
  error?: { text: string | undefined };
  className?: string;
};

const Field: FC<FormFieldProps> = ({
  children,
  required,
  label,
  error,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label?.text && (
        <label>
          <Typography.Title level={5}>
            {label.text}
            {required && <span className={"ml-0.5 text-red-500"}>*</span>}
          </Typography.Title>
        </label>
      )}
      <div className={"gap-1"}>
        {children}
        {error?.text && <PrimaryError text={error.text} />}
      </div>
    </div>
  );
};

export default Field;
