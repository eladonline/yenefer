import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { login } from "@/app/service/authentication";
import { AxiosError } from "axios";

type Credentials = {
  username: string;
  password: string;
};

const useLogin = () => {
  const formFactory = useForm<FieldValues & Credentials>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    try {
      await login(data);
    } catch (err: AxiosError | any) {
      formFactory.setError("formError", {
        type: "custom",
        message: err.message,
      });
    }
  };

  const onError = async (error: any) => {};

  return { formFactory, onSubmit, onError };
};

export default useLogin;
