import React from "react";
import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <>
      <section className="pink-container !min-h-[230px] ">
        <h1 className="heading">Submit your Startup</h1>
       
      </section>
      <StartupForm />
    </>
  );
}
