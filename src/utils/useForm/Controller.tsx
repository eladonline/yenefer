import { Controller, FieldValues } from "react-hook-form";
import React, { FC, ReactElement, ReactHTMLElement } from "react";

const FormController: FC<FieldValues> = ({
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
        field: { onChange, onBlur, value, name: childName },
      }): ReactElement => {
        return (
          <>
            {React.Children.map(
              children,
              (child: React.ReactComponentElement<any>) => {
                if (!React.isValidElement(child)) return child;

                const nextChildProps = {
                  name: childName,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e);

                    if (typeof child.props.onChange === "function")
                      child.props.onChange(e);
                  },
                  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onBlur();
                    if (typeof child.props.onBlur === "function")
                      child.props.onBlur(e);
                  },
                  value:
                    child.props?.value ?? value ?? child.props?.defaultValue,
                };

                return React.cloneElement(child, nextChildProps);
              },
            )}
          </>
        );
      }}
    />
  );
};

export default FormController;
