import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/app/service/authentication";
import AuthUtility from "@/utils/Auth";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export type SignInCredentials = {
  username: "";
  password: "";
  confirmPassword: "";
};

const useSignUp = () => {
  const router = useRouter();
  const formFactory = useForm<FieldValues & SignInCredentials>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignInCredentials> = async (data) => {
    try {
      const res = await login(data);
      const { token, authorization } = res.data;
      const authUtility = new AuthUtility();
      authUtility.doLogin({
        details: {
          username: data.username,
        },
        token,
        authorization,
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

export default useSignUp;
