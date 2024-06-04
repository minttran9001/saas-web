import { Resend } from "resend";

const EmailProvider = new Resend(process.env.RESEND_SECRET);

export default EmailProvider;
