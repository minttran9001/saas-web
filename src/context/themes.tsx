"use client";
import { ThemeProvider } from "next-themes";

export const ThemesProvider: React.FC<
  React.PropsWithChildren<Record<string, unknown>>
> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};
