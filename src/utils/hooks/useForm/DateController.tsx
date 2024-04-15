import { Controller, FieldValues } from "react-hook-form";
import React, { FC, ReactElement } from "react";
import dayjs from "dayjs";

const DateController: FC<FieldValues> = ({
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
              (child: React.ReactHTMLElement<any>) => {
                if (!React.isValidElement(child)) return child;

                let nextValue = null;
                if (child.props?.value || value || child.props?.defaultValue)
                  nextValue = dayjs(
                    child.props?.value ?? value ?? child.props?.defaultValue,
                  );

                const nextChildProps = {
                  name: childName,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e);

                    if (typeof child.props.onChange === "function")
                      child.props.onChange(e);
                  },
                  onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                    onBlur();
                    if (typeof child.props.onBlur === "function")
                      child.props.onBlur(e);
                  },
                  value: nextValue,
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

export default DateController;
