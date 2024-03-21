import { FC, PropsWithChildren } from "react";
import { userSettings } from "@/app/services/settings";



const Layout: FC<PropsWithChildren> = (props) => {
  console.log(props);
  return props.children;
};

export default Layout;
