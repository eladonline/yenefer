"use client";
import formFactory from "./lib/form";

export default function Login() {
  const form = formFactory.useForm();
  return (
    <form.Provider>
      <div className={"p-3 pt-11 flex  flex-col items-center gap-3"}>
        <form.Field
          name={"username"}
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Required";
            },
          }}
          children={(field) => {
            console.log(field);
            return (
              <>
                <input
                  className={"w-min"}
                  placeholder="username"
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                />
                {field.state.meta.errors && (
                  <div>{field.state.meta.errors.join(", ")}</div>
                )}
              </>
            );
          }}
        />

        <input
          className={"w-min"}
          type="password"
          name="password"
          placeholder="Password"
        />
        {/*<div>{errorMessage && <p>{errorMessage}</p>}</div>*/}
        <button className={"p-1 border border-amber-500"}>Login</button>
      </div>
    </form.Provider>
  );
}
