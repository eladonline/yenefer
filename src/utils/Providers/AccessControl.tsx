"use client";
import { createContext, ReactElement, useContext } from "react";
import Token from "@/utils/Token";
import { AccessControlLevelType } from "@/types/accessControl.def";
import jwt from "jsonwebtoken";

type AccessControlType = {
  accessLevel: AccessControlLevelType | null;
};

const AccessControlContext = createContext<AccessControlType>({
  accessLevel: null,
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

export const useAccessControl = () => {
  const { accessLevel } = useContext(AccessControlContext);
  let nextAccessLevel = accessLevel;

  if (!nextAccessLevel) {
    const tokenService = new Token();
    const jwtPayload = jwt.decode(tokenService.token as string, { json: true });
    nextAccessLevel = jwtPayload?.license;
  }

  return { accessLevel: nextAccessLevel };
};

export default AccessControlProvider;
