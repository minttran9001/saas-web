"use server";

import { UserServices } from "@/services/user.service";
import { VerificationTokenServices } from "@/services/verficationToken.service";

export const verifyEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const existingToken =
    await VerificationTokenServices.getVerificationTokenByToken(token);
  if (!existingToken) {
    return {
      error: "Invalid token",
    };
  }
  if (existingToken.email !== email) {
    return {
      error: "Invalid email",
    };
  }
  const existingUser = await UserServices.getUserByEmail(email);
  if (!existingUser) {
    return {
      error: "User not found",
    };
  }

  if (new Date(existingToken.expires).getTime() < new Date().getTime()) {
    return {
      error: "Token expired",
    };
  }

  await UserServices.updateUser(existingUser.id, {
    emailVerified: true,
  });

  await VerificationTokenServices.deleteVerificationToken(existingToken.id);

  return {
    token: existingToken,
  };
};
