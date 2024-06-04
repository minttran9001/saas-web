import { User, UserRole } from "@prisma/client";
import { TCurrentUser } from "./utils/types";

declare module "next-auth" {
  interface Session {
    user: TCurrentUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: UserRole;
  }
}
