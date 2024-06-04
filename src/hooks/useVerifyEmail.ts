import serverActions from "@/actions";
import { VerifyEmailSchema } from "@/schemas";
import { useState } from "react";
import { z } from "zod";

const useVerifyEmail = () => {
  const [verifyEmailInProgress, setVerifyEmailInProgress] = useState(false);
  const [verifyEmailError, setVerifyEmailError] = useState<string>();
  const [verifyEmailSuccess, setVerifyEmailSuccess] = useState(false);
  const onVerifyEmail = async (values: z.infer<typeof VerifyEmailSchema>) => {
    setVerifyEmailInProgress(true);
    setVerifyEmailError(undefined);
    const response = (await serverActions.verifyEmail(values)) as {
      error?: string;
    };
    if (response.error) {
      setVerifyEmailError(response.error);
      console.error("verify email error:", response);
    } else {
      setVerifyEmailSuccess(true);
    }
    setVerifyEmailInProgress(false);
  };
  return {
    onVerifyEmail,
    verifyEmailInProgress,
    verifyEmailError,
    verifyEmailSuccess,
  };
};

export default useVerifyEmail;
