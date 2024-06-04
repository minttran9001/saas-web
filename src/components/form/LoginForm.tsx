"use client";

import React from "react";
import Form from "../core/Form";
import { UseFormReturn } from "react-hook-form";
import FieldTextInput from "../core/FieldTextInput";
import { Button } from "../ui/button";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import RenderWhen from "../core/RenderWhen";
import ErrorMessage from "../core/ErrorMessage";

type TLoginFormProps = {
  onSubmit: (data: z.infer<typeof LoginSchema>) => void;
  inProgress?: boolean;
  error?: string;
};
type TLoginFormValues = z.infer<typeof LoginSchema>;
type TLoginFormComponentProps = {
  form: UseFormReturn<TLoginFormValues>;
  inProgress?: boolean;
  error?: string;
};

const LoginFormComponent = (props: TLoginFormComponentProps) => {
  const { form, inProgress, error } = props;

  return (
    <div className="space-y-5">
      <FieldTextInput<TLoginFormValues>
        form={form}
        label="Email"
        name="email"
        placeholder="Email"
      />
      <FieldTextInput<TLoginFormValues>
        form={form}
        label="Password"
        name="password"
        placeholder="********"
        type="password"
      />
      <Button inProgress={inProgress} disabled={inProgress} className="w-full">
        Login
      </Button>
      <RenderWhen condition={!!error}>
        <ErrorMessage error={error as string} />
      </RenderWhen>
    </div>
  );
};

const LoginForm = (props: TLoginFormProps) => {
  const { onSubmit, inProgress, error } = props;
  return (
    <Form<TLoginFormValues>
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
      Schema={LoginSchema}
    >
      {(form) => (
        <LoginFormComponent form={form} inProgress={inProgress} error={error} />
      )}
    </Form>
  );
};

export default LoginForm;
