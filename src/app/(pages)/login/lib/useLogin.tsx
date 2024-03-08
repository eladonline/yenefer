import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { login } from "@/app/service/authentication";
import { AxiosError } from "axios";
import Token from "@/app/service/Token";
import { useRouter } from "next/navigation";

type Credentials = {
  username: string;
  password: string;
};

const useLogin = () => {
  const router = useRouter();
  const formFactory = useForm<FieldValues & Credentials>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    try {
      const res = await login(data);
      const { token } = res.data;
      const tokenService = new Token();
      tokenService.token = token;
      router.push("/");
    } catch (err: AxiosError | any) {
      console.log(err);
      formFactory.setError("formError", {
        type: "custom",
        message: err.response.data.message,
      });
    }
  };

  return { formFactory, onSubmit };
};

export default useLogin;
