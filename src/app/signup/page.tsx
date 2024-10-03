import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@/models/userModel";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/utils";

const Login = () => {
  const signup = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email || !password || !name) {
      throw new Error("Please fill all the fields");
    }

    // Connect to Database
    await connectDB();

    const user = await User.findOne({ email });

    if (user) throw new Error("User already exists");

    const hashedPassword = await hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    redirect("/login");
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={signup} className="flex flex-col gap-4">
            <Input placeholder="Name" name="name" />

            <Input type="email" placeholder="Email" name="email" />

            <Input type="password" placeholder="Password" name="password" />

            <Button type="submit">Signup</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>or</span>
          <form>
            <Button variant={"outline"} type="submit">
              Signup with Google
            </Button>
          </form>

          <Link href="/login">Already have an account? Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
