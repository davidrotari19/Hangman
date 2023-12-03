"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import signUp from "@/firebase/auth";

const Page = () => {
  const router = useRouter();
  const [error, setError] = React.useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !e.target.name.value ||
      !e.target.email.value ||
      !e.target.password.value
    ) {
      setError("Toate câmpurile sunt obligatorii.");
      return;
    }

    const { result, error } = await signUp(
      e.target.email.value,
      e.target.password.value,
      e.target.name.value
    );

    if (error) {
      return setError(error.message);
    } else {
      return router.push("/");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-xl w-full text-center">
      <h1 className="text-4xl font-bold mb-0">Înregistrare</h1>
      <p className="text-md text-muted-foreground mt-0 mb-4">
        Înregistrează-te pentru a putea juca și a-ți salva progresul.
      </p>
      {error && <p className="text-sm text-red-500 mt-0 mb-2">{error}</p>}
      <form className="flex flex-col gap-4" onSubmit={handleRegister}>
        <Input placeholder={"Nume & Prenume"} type="text" name="name" />
        <Input placeholder={"Email"} type="email" name="email" />
        <Input placeholder={"Parola"} type="password" name="password" />
        <Button variant={"default"} size={"lg"} type="submit">
          Înregistrare
        </Button>
      </form>
      <p className="text-sm text-muted-foreground mt-0 mb-4">
        Ai deja cont?{"  "}
        <Link href="/auth/login" className="text-orange-500">
          Autentifică-te
        </Link>
      </p>
    </div>
  );
};

export default Page;
