import { Controller, FieldValues } from "react-hook-form";
import React, { FC, ReactElement } from "react";
import { UploadFile, UploadProps } from "antd/lib";

const UploadController: FC<FieldValues> = ({
  name,
  rules,
  control,
  children,
}) => {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({
        field: { onChange, value, name: childName },
      }): ReactElement<{
        value: UploadFile[];
        name: string;
        onChange: React.ChangeEvent<UploadProps["onChange"]>;
      }> => {
        return (
          <>
            {React.Children.map(
              children,
              (child: React.ReactHTMLElement<any>) => {
                if (!React.isValidElement(child)) return child;

                const nextChildProps = {
                  name: childName,
                  onChange: (e: UploadProps) => {
                    onChange(e.fileList);

                    if (typeof child.props.onChange === "function") {
                      // @ts-ignore
                      child.props.onChange(e.fileList);
                    }
                  },
                  fileList:
                    child.props?.value ?? value ?? child.props?.defaultValue,
                };

                // @ts-ignore
                return React.cloneElement(child, nextChildProps);
              },
            )}
          </>
        );
      }}
    />
  );
};

export default UploadController;
