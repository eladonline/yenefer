import { FC } from "react";
import { Typography } from "antd/lib";

type PrimaryErrorProps = {
  text: string | undefined;
  className?: string | undefined;
};

const PrimaryError: FC<PrimaryErrorProps> = ({ text, className = "" }) => {
  return (
    <Typography.Text type="danger" className={`text-xs ${className}`}>
      {text}
    </Typography.Text>
  );
};

export default PrimaryError;
