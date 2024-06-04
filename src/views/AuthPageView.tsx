"use client";

import LoginForm from "@/components/form/LoginForm";
import SignupForm from "@/components/form/SignupForm";
import { Card } from "@/components/ui/card";
import React from "react";

import SocialButton from "@/components/core/SocialButton";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import useLogin from "@/hooks/useLogin";
import useSignup from "@/hooks/useSignup";
import NamedLink from "@/components/core/NamedLink/NamedLink";

type Props = {
  isLogin?: boolean;
};

const AuthPageView = (props: Props) => {
  const { isLogin } = props;
  const { onLogin, loginError, loginInProgress } = useLogin();
  const { onSignup, signupInProgress, signupError } = useSignup();
  const onGoogleLogin = async () =>
    signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT });

  return (
    <Card className="max-w-[500px] mx-auto mt-36 p-8">
      <SocialButton className="mb-2" onClick={onGoogleLogin} />
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <div className="flex-1 border-t border-gray-300" />
        <p className="text-center my-3 dark:text-white">OR</p>
        <div className="flex-1 border-t border-gray-300" />
      </div>
      {isLogin ? (
        <>
          <h1 className="text-4xl mb-2">Login</h1>
          <p className="text-sm mb-3">Welcome back!</p>
          <LoginForm
            onSubmit={onLogin}
            inProgress={loginInProgress}
            error={loginError}
          />
        </>
      ) : (
        <>
          <h1 className="text-4xl mb-4">Sign up</h1>
          <SignupForm
            onSubmit={onSignup}
            inProgress={signupInProgress}
            error={signupError}
          />
        </>
      )}
      <p className="text-sm text-center mt-3">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <NamedLink name={isLogin ? "SignupPage" : "LoginPage"}>
          {isLogin ? "Sign up" : "Login"}
        </NamedLink>
      </p>
    </Card>
  );
};

export default AuthPageView;
