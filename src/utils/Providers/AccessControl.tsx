"use client";
import { createContext, ReactElement, useContext } from "react";
import Token from "@/utils/Token";
import { AccessControlLevelType } from "@/types/accessControl.def";

type AccessControlType = {
  accessLevel: AccessControlLevelType;
};

const AccessControlContext = createContext<AccessControlType>({
  accessLevel: "guest",
});

const AccessControlProvider = ({
  children,
  license,
}: {
  license: AccessControlLevelType;
  children: ReactElement;
}) => {
  return (
    <AccessControlContext.Provider value={{ accessLevel: license }}>
      {children}
    </AccessControlContext.Provider>
  );
};

export const useAccessControl = () => useContext(AccessControlContext);

export default AccessControlProvider;
