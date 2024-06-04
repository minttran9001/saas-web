"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import Form from "../core/Form";
import { z } from "zod";
import { VerifyEmailSchema } from "@/schemas";
import FieldTextInput from "../core/FieldTextInput";
import { Button } from "../ui/button";
import ErrorMessage from "../core/ErrorMessage";
import RenderWhen from "../core/RenderWhen";

type TVerifyEmailFormValues = z.infer<typeof VerifyEmailSchema>;

type Props = {
  onSubmit: (data: TVerifyEmailFormValues) => void;
  inProgress?: boolean;
  error?: string;
  defaultValues?: TVerifyEmailFormValues;
};

type TVerifyEmailFormComponentProps = {
  form: UseFormReturn<TVerifyEmailFormValues>;
  inProgress?: boolean;
  error?: string;
};

const VerifyEmailFormComponent = (props: TVerifyEmailFormComponentProps) => {
  const { form, inProgress, error } = props;
  return (
    <div className="space-y-3">
      <FieldTextInput<TVerifyEmailFormValues>
        form={form}
        label="Email"
        name="email"
        placeholder="Email"
      />
      <FieldTextInput<TVerifyEmailFormValues>
        form={form}
        label="Token"
        name="token"
        placeholder="Token"
      />
      <Button inProgress={inProgress} disabled={inProgress}>
        Verify Email
      </Button>
      <RenderWhen condition={!!error}>
        <ErrorMessage error={error as string} />
      </RenderWhen>
    </div>
  );
};

const VerifyEmailForm = (props: Props) => {
  const { onSubmit, defaultValues, ...rest } = props;
  return (
    <Form<TVerifyEmailFormValues>
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      Schema={VerifyEmailSchema}
    >
      {(form) => <VerifyEmailFormComponent form={form} {...rest} />}
    </Form>
  );
};
export default VerifyEmailForm;
