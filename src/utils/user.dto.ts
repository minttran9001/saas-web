import { User } from "@prisma/client";
import { TCurrentUser } from "./types";

export const currentUserDto = (user: User): TCurrentUser => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    image: user.image,
  };
};
