"use client";
import React, { useEffect } from "react";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { app } from "@/firebase/config";
const Header = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/auth/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/">
        <h1 className="text-foreground font-bold text-lg">
          PoleCiudes <span className="text-foreground/60 text-xs">v1.0.0</span>
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <div className="flex items-center gap-4">
              <p className={`text-foreground/60 text-sm hidden md:block `}>
                {user?.displayName}
              </p>
              <DropdownMenuTrigger>
                <Image
                  src={"/user.webp"}
                  alt={"ss"}
                  width={35}
                  height={35}
                  className={`rounded-full aspect-square object-cover ring ring-blue-500/20 ring-offset-transparent ring-offset-2`}
                />
              </DropdownMenuTrigger>
            </div>

            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Account settings</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 font-semibold bg-red-500/10"
                onClick={handleSignOut}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button asChild variant={"outline"} size={"sm"}>
              <Link href="/auth/register">Register</Link>
            </Button>

            <Button asChild variant={"default"} size={"sm"}>
              <Link href="/auth/login">Login</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
