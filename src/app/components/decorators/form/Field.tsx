import { FC, ReactElement } from "react";
import PrimaryError from "@/app/components/errors/PrimaryError";
import { Typography } from "antd/lib";

type FormFieldProps = {
  children: ReactElement;
  label?: { text: string };
  error?: { text: string | undefined };
  className?: { text: string | undefined };
};

const Field: FC<FormFieldProps> = ({
  children,
  label,
  error,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1.5  ${className}`}>
      {label?.text && (
        <label className={"font-semibold"}>
          <Typography.Title level={5}>{label.text}</Typography.Title>
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
