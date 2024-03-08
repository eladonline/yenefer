import { FC } from "react";

type PrimaryErrorProps = {
  text: string | undefined;
  className?: string | undefined;
};

const PrimaryError: FC<PrimaryErrorProps> = ({ text, className = "" }) => {
  return <div className={`text-red-600 text-xs ${className}`}>{text}</div>;
};

export default PrimaryError;
