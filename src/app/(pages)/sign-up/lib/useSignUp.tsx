import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signup } from "@/app/services/authentication";
import AuthUtility from "@/utils/Auth";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export type SignInCredentials = {
  username: "";
  password: "";
  confirm: "";
};

const useSignUp = () => {
  const router = useRouter();
  const formFactory = useForm<FieldValues & SignInCredentials>({
    defaultValues: {
      username: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit: SubmitHandler<SignInCredentials> = async (
    data: SignInCredentials,
  ) => {
    try {
      const res = await signup(data);
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

export default useSignUp;
