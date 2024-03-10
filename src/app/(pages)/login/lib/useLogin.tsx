import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { login } from "@/app/service/authentication";
import { AxiosError } from "axios";
import Token from "@/utils/Token";
import { useRouter } from "next/navigation";
import AuthUtility from "@/utils/Auth";

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
      const authUtility = new AuthUtility();
      authUtility.doLogin({
        details: {
          username: data.username,
        },
        token,
      });
      router.replace("/");
    } catch (err: AxiosError | any) {
      formFactory.setError("formError", {
        type: "custom",
        message: err.response.data.message,
      });
    }
  };

  return { formFactory, onSubmit };
};

export default useLogin;
