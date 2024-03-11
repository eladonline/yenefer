import { Typography } from "antd/lib";
import React, { PropsWithChildren } from "react";
type TitleProps = {
  color?: string;
  className?: string;
};

const TypographyTitle: React.FC<PropsWithChildren & TitleProps> = ({
  children,
  ...props
}) => {
  return <Typography.Title {...props}>{children}</Typography.Title>;
};

export { TypographyTitle as Title };
