"use client";

import React from "react";
import Logo from "../ui/logo";
import { cn } from "@/lib/utils";
import AccountMenu from "../core/AccountMenu/AccountMenu";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ModeToggle } from "../core/ModeToggle/ModeToggle";
import { Navigation } from "../core/Navigation/Navigation";

type Props = {
  className?: string;
};

const GeneralHeader = (props: Props) => {
  const { currentUser } = useCurrentUser();

  const { className } = props;
  const classes = cn(
    "w-full h-16 border-b-[1px] px-4 flex justify-between items-center fixed top-0",
    className
  );

  return (
    <div className={classes}>
      <Logo />
      <Navigation />
      <div className="flex items-center gap-3">
        <ModeToggle />
        <AccountMenu user={currentUser} />
      </div>
    </div>
  );
};

export default GeneralHeader;
