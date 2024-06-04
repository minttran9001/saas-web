import React from "react";

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
} & React.ComponentProps<typeof Button>;

const SocialButton = (props: Props) => {
  const { className, ...rest } = props;
  const classes = cn("w-full flex items-center gap-2", className);
  return (
    <Button {...rest} className={classes}>
      <FcGoogle />
      Continue with Google
    </Button>
  );
};

export default SocialButton;
