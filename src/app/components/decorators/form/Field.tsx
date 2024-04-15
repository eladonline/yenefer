import { FC, ReactElement } from "react";
import PrimaryError from "@/app/components/errors/PrimaryError";
import { Typography, TooltipProps, Tooltip } from "antd/lib";
import { InfoCircleFilled } from "@ant-design/icons";

type FormFieldProps = {
  children: ReactElement;
  required?: boolean;
  label?: { text: string; tooltip?: TooltipProps };
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
            {label.tooltip && (
              <Tooltip {...label.tooltip}>
                <InfoCircleFilled className={"ml-1"} />
              </Tooltip>
            )}
          </Typography.Title>
        </label>
      )}
      <Tooltip
        color={"#ffffff"}
        title={error?.text && <PrimaryError text={error.text} />}
      >
        {children}
      </Tooltip>
    </div>
  );
};

export default Field;
