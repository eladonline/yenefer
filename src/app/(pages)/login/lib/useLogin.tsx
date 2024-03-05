import {
  useForm,
  SubmitHandler,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";
import { login } from "@/app/service/authentication";
import { AxiosError } from "axios";

type Credentials = {
  username: string;
  password: string;
};

const useLogin = () => {
  const formFactory = useForm<FieldValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    console.log(data);
    try {
      await login(data);
    } catch (err: AxiosError | any) {
      formFactory.setError("formError", {
        type: "custom",
        message: err.message,
      });
    }
  };

  return { formFactory, onSubmit };
};

export default useLogin;
