import { TCurrentUser } from "@/utils/types";
import { useSession } from "next-auth/react";

type TUseCurrentUserReturn = {
  currentUser?: TCurrentUser;
};

const useCurrentUser = (): TUseCurrentUserReturn => {
  const session = useSession();

  return {
    currentUser: session.data?.user,
  };
};

export default useCurrentUser;
