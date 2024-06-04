import { login } from "./login";
import { signup } from "./signup";
import { verifyEmail } from "./verifyEmail";
import { signOut } from "@/auth";

const serverActions = {
  login,
  signup,
  verifyEmail,
  signOut,
};

export default serverActions;
