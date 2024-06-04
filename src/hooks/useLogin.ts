import { login } from "@/actions/login";
import { useState } from "react";
import { z } from "zod";
import { LoginSchema } from "@/schemas";

const useLogin = () => {
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState<string>();

  const onLogin = async (values: z.infer<typeof LoginSchema>) => {
    setLoginInProgress(true);
    setLoginError(undefined);
    const response = (await login(values)) as {
      error?: string;
    };

    if (response?.error) {
      console.error(response);
      setLoginError("Invalid credentials");
    }
    setLoginInProgress(false);
    return response;
  };

  return {
    onLogin,
    loginInProgress,
    loginError,
  };
};

export default useLogin;
