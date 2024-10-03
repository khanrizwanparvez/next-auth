import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";

import { User } from "./models/userModel";

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
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password)
          throw new CredentialsSignin("Please provide both email and password");

        // Connect to Database

        const user = await User.findOne({ email }).select("+password");

        if (!user) throw new CredentialsSignin("Invalid email or password");

        if (!user.password)
          throw new CredentialsSignin("Invalid email or password");

        const isPasswordMatched = await compare(password, user.password);

        if (!isPasswordMatched) throw new CredentialsSignin("Invalid Password");

        return { name: user.name, email: user.email, id: user._id };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
