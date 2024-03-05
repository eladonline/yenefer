"use client";
import useLogin from "./lib/useLogin";

function Login() {
  const {
    onSubmit,
    formFactory: { register, handleSubmit, formState, clearErrors },
  } = useLogin();

  return (
    <div className={"p-3 pt-11 flex  flex-col items-center gap-3"}>
      <input
        className={"w-min"}
        placeholder="username"
        {...register("username")}
        onChange={() => clearErrors("formError")}
      />

      <input
        className={"w-min"}
        placeholder="password"
        {...register("password")}
        onChange={() => clearErrors("formError")}
      />

      <div>
        {formState?.errors?.formError && (
          <p>{formState?.errors?.formError.message}</p>
        )}
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        className={"p-1 border border-amber-500"}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
