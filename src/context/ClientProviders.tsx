import React, { PropsWithChildren } from "react";
import { ThemesProvider } from "./themes";
import { Inter as FontSans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

type Props = PropsWithChildren<{
  session: Session | null;
}>;

const ClientProviders = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <ThemesProvider>{children}</ThemesProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
