import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return <div>Home Page</div>;
};

export default Home;
