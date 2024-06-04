import EmailProvider from "@/lib/emailProvider";

export const sendVerificationEmail = async (email: string, token: string) => {
  const response = await EmailProvider.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email address",
    html: `
       <div>
       <p>Click the link below to verify your email address:</p>
       <a href="${process.env.NEXT_PUBLIC_URL}/verify-email?token=${token}&email=${email}">Verify Email</a>
       </div>
    `,
  });
  return response;
};

export const EmailServices = {
  sendVerificationEmail,
};
