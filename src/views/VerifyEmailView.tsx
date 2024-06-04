"use client";

import NamedLink from "@/components/core/NamedLink/NamedLink";
import RenderWhen from "@/components/core/RenderWhen";
import VerifyEmailForm from "@/components/form/VerifyEmailForm";
import { Card } from "@/components/ui/card";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FcOk } from "react-icons/fc";

type Props = {};

const VerifyEmailView = (props: Props) => {
  const params = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const {
    onVerifyEmail,
    verifyEmailSuccess,
    verifyEmailInProgress,
    verifyEmailError,
  } = useVerifyEmail();

  useEffect(() => {
    if (!token || !email) {
      return;
    }
    onVerifyEmail({ token, email });
  }, [token, email]);

  return (
    <Card className="max-w-[500px] mx-auto mt-36 p-8">
      <RenderWhen condition={!verifyEmailSuccess}>
        <div className="flex gap-2 items-center mb-2">
          <FcOk size={30} />
          <h1 className="text-2xl ">Email Verified</h1>
        </div>
        <NamedLink name="LoginPage">
          <p className="text-sm text-blue-500">
            Click here to login with your new email
          </p>
        </NamedLink>
        <RenderWhen.False>
          <h1 className="text-4xl mb-4">Verify Email</h1>
          <VerifyEmailForm
            inProgress={verifyEmailInProgress}
            error={verifyEmailError}
            onSubmit={onVerifyEmail}
            defaultValues={{ token: token as string, email: email as string }}
          />
        </RenderWhen.False>
      </RenderWhen>
    </Card>
  );
};

export default VerifyEmailView;
