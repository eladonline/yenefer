import { FC } from "react";

type PrimaryErrorProps = { text: string };

const PrimaryError: FC<PrimaryErrorProps> = ({ text }) => {
  return <div className={"text-red-600 text-xs"}>{text}</div>;
};

export default PrimaryError;
