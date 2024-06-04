import { db } from "@/lib/db";
import { VerificationToken } from "@prisma/client";
import { v4 as uuid } from "uuid";
export const getVerificationTokenByEmail = async (email: string) => {
  const token = await db.verificationToken.findFirst({
    where: {
      email,
    },
  });
  return token;
};

export const getVerificationTokenByToken = async (token: string) => {
  const tokenRecord = await db.verificationToken.findFirst({
    where: {
      token,
    },
  });
  return tokenRecord;
};

export const deleteVerificationToken = async (id: string) => {
  const tokenRecord = await db.verificationToken.delete({
    where: {
      id,
    },
  });
  return tokenRecord;
};

export const createVerificationToken = async (
  data: Pick<VerificationToken, "email" | "token" | "expires">
) => {
  const tokenRecord = await db.verificationToken.create({
    data,
  });
  return tokenRecord;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await deleteVerificationToken(existingToken.id);
  }
  const verificationToken = await createVerificationToken({
    email,
    token,
    expires,
  });
  return verificationToken;
};

export const VerificationTokenServices = {
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
  deleteVerificationToken,
  createVerificationToken,
  generateVerificationToken,
};
