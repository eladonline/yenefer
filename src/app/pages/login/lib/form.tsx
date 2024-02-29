import { createFormFactory } from "@tanstack/react-form";
import { authenticate } from "@/app/pages/login/lib/actions";

type Credentials = {
  username: string;
  password: string;
};

const formFactory = createFormFactory<Credentials>({
  defaultValues: {
    username: "",
    password: "",
  },
  onSubmit: async ({ value }) => await authenticate(value),
});

export default formFactory;
