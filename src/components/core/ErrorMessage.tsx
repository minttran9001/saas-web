import React from "react";
import { cn } from "@/lib/utils";
import { AiOutlineWarning } from "react-icons/ai";
type Props = {
  error: string;
  className?: string;
};

const ErrorMessage = (props: Props) => {
  const { error, className } = props;
  return (
    <div
      className={cn(
        "text-red-500 text-sm border border-red-500 p-2 rounded-md w-full bg-red-50",
        className
      )}
    >
      <AiOutlineWarning className="inline-block mr-2" />
      {error}
    </div>
  );
};

export default ErrorMessage;
