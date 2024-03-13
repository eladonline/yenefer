import PrimaryLoader from "@/app/components/loaders/PrimaryLoader";
import React, { ReactElement } from "react";

export default function DefaultPageLoading({
  position = "relative",
}): ReactElement<{ position?: string }> {
  if (position === "absolute") position = "absolute top-0 left-0";

  return (
    <div className={`h-[100%] w-[100%] ${position}`}>
      <PrimaryLoader />;
    </div>
  );
}
