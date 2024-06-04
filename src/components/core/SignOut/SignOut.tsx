"use client";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import React from "react";

type Props = {
  className?: string;
  text?: string;
};

const SignOut = (props: Props) => {
  const { className, text } = props;
  const handleSignOut = () => {
    signOut();
  };
  const classes = cn("", className);
  return (
    <button className={classes} onClick={handleSignOut}>
      {text || "Sign Out"}
    </button>
  );
};

export default SignOut;
