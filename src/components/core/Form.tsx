"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { Form as ShadCNForm } from "@/components/ui/form";

type TFormProps<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => void;
  children: (form: UseFormReturn<T>) => React.ReactNode;
  Schema: z.ZodType<T>;
};

const Form = <T extends FieldValues>(props: TFormProps<T>) => {
  const { defaultValues, onSubmit, children, Schema } = props;
  const form = useForm<z.infer<typeof Schema>>({
    defaultValues,
    resolver: zodResolver(Schema),
  });

  return (
    <ShadCNForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children(form)}</form>
    </ShadCNForm>
  );
};

export default Form;
