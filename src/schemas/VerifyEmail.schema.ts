import { z } from "zod";

const VerifyEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  token: z.string().min(8, "Token must be at least 8 characters long"),
});

export default VerifyEmailSchema;
