"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/services/user.service";
import { generateVerificationToken } from "@/services/verficationToken.service";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      error: "Invalid data",
    };
  }

  const { email, password } = data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: "Email does not exist",
    };
  }

  if (!existingUser.emailVerified) {
    await generateVerificationToken(existingUser.email);
    return {
      message: "Verification email sent. Please verify your email to login.",
    };
  }

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
            error: "Invalid credentials",
          };
        }

        default:
          return {
            error: "An error occurred",
          };
      }
    }

    throw e;
  }
};
