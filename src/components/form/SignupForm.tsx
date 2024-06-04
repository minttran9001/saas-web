"use client";
import React from "react";
import Form from "../core/Form";
import FieldTextInput from "../core/FieldTextInput";
import { Button } from "../ui/button";
import { UseFormReturn } from "react-hook-form";
import { SignupSchema } from "@/schemas";
import { z } from "zod";
import RenderWhen from "../core/RenderWhen";
import ErrorMessage from "../core/ErrorMessage";

type Props = {
  onSubmit: (data: TSignupFormValues) => void;
  inProgress?: boolean;
  error?: string;
};

type TSignupFormValues = z.infer<typeof SignupSchema>;

type TSignupFormComponentProps = {
  form: UseFormReturn<TSignupFormValues>;
  inProgress?: boolean;
  error?: string;
};

const SignupFormComponent = (props: TSignupFormComponentProps) => {
  const { form, inProgress, error } = props;
  return (
    <div className="space-y-5">
      <div className="flex justify-between *:w-full gap-2">
        <FieldTextInput<TSignupFormValues>
          form={form}
          label="Name"
          name="firstName"
          placeholder="First name"
        />
        <FieldTextInput<TSignupFormValues>
          form={form}
          label="Name"
          name="lastName"
          placeholder="Last name"
        />
      </div>
      <FieldTextInput<TSignupFormValues>
        form={form}
        label="Email"
        name="email"
        placeholder="Email"
      />
      <FieldTextInput<TSignupFormValues>
        form={form}
        label="Password"
        name="password"
        placeholder="********"
        type="password"
      />
      <Button
        inProgress={inProgress}
        disabled={inProgress}
        type="submit"
        className="w-full"
      >
        Sign up
      </Button>
      <RenderWhen condition={!!error}>
        <ErrorMessage error={error as string} />
      </RenderWhen>
    </div>
  );
};

const SignupForm = (props: Props) => {
  const { onSubmit, ...rest } = props;
  return (
    <Form<TSignupFormValues> onSubmit={onSubmit} Schema={SignupSchema}>
      {(form) => <SignupFormComponent form={form} {...rest} />}
    </Form>
  );
};

export default SignupForm;
