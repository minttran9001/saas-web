import { z } from "zod";

const SignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  firstName: z.string().min(2, "Name must be at least 2 characters long"),
  lastName: z.string().min(2, "Name must be at least 2 characters long"),
});

export default SignupSchema;
