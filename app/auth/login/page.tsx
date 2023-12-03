"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import signIn from "@/firebase/signIn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const [error, setError] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!e.target.email.value || !e.target.password.value) {
      setError("Toate câmpurile sunt obligatorii.");
      return;
    }

    const { result, error } = await signIn(
      e.target.email.value,
      e.target.password.value
    );

    if (error) {
      return setError(error?.message);
    } else {
      return router.push("/");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-xl w-full text-center">
      <h1 className="text-4xl font-bold mb-0">Autentificare</h1>
      <p className="text-md text-muted-foreground mt-0 mb-4">
        Autentifica-te pentru a putea juca.
      </p>
      {error && <p className="text-sm text-red-500 mt-0 mb-2">{error}</p>}
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <Input placeholder={"Email"} type="email" name="email" />
        <Input placeholder={"Parola"} type="password" name="password" />
        <Button variant={"default"} size={"lg"} type="submit">
          Autentificare
        </Button>
      </form>
      <p className="text-sm text-muted-foreground mt-0 mb-4">
        Nu ai cont?{"  "}
        <Link href="/auth/register" className="text-orange-500">
          Înregistrează-te
        </Link>
      </p>
    </div>
  );
};

export default Page;
