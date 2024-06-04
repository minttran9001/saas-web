"use server";

import * as z from "zod";
import { SignupSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/services/user.service";
import { generateVerificationToken } from "@/services/verficationToken.service";
import { sendVerificationEmail } from "@/services/email.service";

export const signup = async (data: z.infer<typeof SignupSchema>) => {
  const validateFields = SignupSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      error: "Invalid data",
    };
  }

  const { password, firstName, lastName, email } = data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "User already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to database
  await createUser({
    email,
    firstName,
    lastName,
    password: hashedPassword,
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    message: "User created successfully",
  };
};
