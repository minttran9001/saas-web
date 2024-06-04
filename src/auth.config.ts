import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./services/user.service";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile: (profile) => {
        return {
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          image: profile.picture,
          role: "USER",
          emailVerified: true,
        };
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data as unknown as z.infer<
            typeof LoginSchema
          >;
          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }
          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
