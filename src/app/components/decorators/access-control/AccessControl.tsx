import { useAccessControl } from "@/utils/Providers/AccessControl";
import { ReactElement } from "react";
import {
  AccessControlLevelType,
  AccessControlLevelsEnum,
} from "@/types/accessControl.def";

type AccessControlType = {
  hide?: boolean;
  children: ReactElement;
  access: AccessControlLevelType;
};

const AccessControl = ({ hide, children, access }: AccessControlType) => {
  const { accessLevel } = useAccessControl();
  if (!accessLevel) return null;

  if (AccessControlLevelsEnum[accessLevel] >= AccessControlLevelsEnum[access]) {
    return children;
  }

  if (hide) return <div className={"invisible"}>{children}</div>;
  return null;
};

export default AccessControl;
