import { signup } from "@/actions/signup";
import { SignupSchema } from "@/schemas";
import React, { useState } from "react";
import { z } from "zod";

const useSignup = () => {
  const [signupInProgress, setSignupInProgress] = useState(false);
  const [signupError, setSignupError] = useState<string>();

  const onSignup = async (values: z.infer<typeof SignupSchema>) => {
    setSignupInProgress(true);
    setSignupError(undefined);
    const response = (await signup(values)) as {
      error?: string;
    };
    if (response.error) {
      setSignupError(response.error);
    }
    setSignupInProgress(false);
    // return response
  };
  return {
    onSignup,
    signupInProgress,
    signupError,
  };
};

export default useSignup;
