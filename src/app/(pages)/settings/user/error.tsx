"use client";

import { AxiosError } from "axios";
import { useEffect } from "react";

type ErrorProps = {
  error: AxiosError;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  console.log(error);
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>
        {(error?.response?.data as { message: string })?.message ||
          "An error occurred"}
        !
      </h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
