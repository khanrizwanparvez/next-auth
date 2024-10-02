import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: ({ email, password }) => {
        console.log(email, password);

        if (typeof email !== "string")
          throw new CredentialsSignin({
            cause: "Email is not valid",
          });

        const user = { email, id: "dfd" };

        if (password !== "passcode")
          throw new CredentialsSignin({
            cause: "Password does not match",
          });
        else return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
