import React, { HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "../ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import RenderWhen from "./RenderWhen";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  label?: string;
  placeholder?: string;
  name: Path<T>;
  type?: HTMLInputTypeAttribute;
};

const FieldTextInput = <T extends FieldValues>(props: Props<T>) => {
  const { form, label, placeholder, name, type } = props;
  useFormField;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <RenderWhen condition={!!label}>
            <FormLabel>{label}</FormLabel>
          </RenderWhen>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FieldTextInput;
