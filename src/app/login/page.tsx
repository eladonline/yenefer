"use client";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "./lib/actions";

export default function Login() {
  const [errorMsg, dispatch] = useFormState(authenticate, null);
  return (
    <form
      action={dispatch}
      className={"p-3 pt-11 flex  flex-col items-center gap-3"}
    >
      <input
        className={"w-min"}
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        className={"w-min"}
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      {/*<div>{errorMessage && <p>{errorMessage}</p>}</div>*/}
      <Submit />
    </form>
  );
}

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={"p-1 border border-amber-500"}
      type="submit"
    >
      Login
    </button>
  );
};
