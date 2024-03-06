import { FC, ReactElement } from "react";
import PrimaryError from "@/app/components/errors/PrimaryError";

type FormFieldProps = {
  children: ReactElement;
  label?: { text: string };
  error?: { text: string | undefined };
};

const Field: FC<FormFieldProps> = ({ children, label, error }) => {
  return (
    <div className={"flex flex-col gap-1.5"}>
      {label?.text && <label>{label.text}</label>}

      <div className={"gap-1"}>
        {children}
        {error?.text && <PrimaryError text={error.text} />}
      </div>
    </div>
  );
};

export default Field;
