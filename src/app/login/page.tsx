"use client";
import formFactory from "./lib/form";

export default function Login() {
  const form = formFactory.useForm();
  console.log(form.state);
  return (
    <form.Provider>
      <form className={"p-3 pt-11 flex  flex-col items-center gap-3"}>
        <form.Field
          name={"username"}
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Required";
            },
          }}
          children={({ state }) => {
            return (
              <>
                <input
                  className={"w-min"}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={state.value}
                />
                {state.error && <div>{state.error}</div>}
              </>
            );
          }}
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
    </form.Provider>
  );
}

const Submit = () => {
  return (
    <button className={"p-1 border border-amber-500"} type="submit">
      Login
    </button>
  );
};
