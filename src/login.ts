"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      code: 400,
      error: "Invalid data",
    };
  }

  const { email, password } = data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin": {
          return {
            code: 401,
            error: "Invalid credentials",
          };
        }

        default:
          return {
            code: 500,
            error: "An error occurred",
          };
      }
    }
    throw e;
  }
};
