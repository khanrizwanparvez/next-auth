"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { toast } from "sonner";

export const credentialsLogin = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
};
