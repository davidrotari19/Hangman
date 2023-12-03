"use client";
import React from "react";
import { Button } from "./ui/button";
import { getDoc, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/firebase/config";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Letters = ({
  currentTurn,
  lobby,
  players,
}: {
  currentTurn: any;
  lobby: any;
  players: any;
}) => {
  const handleClick = (letter: string) => {
    const letterButton = document.getElementById(letter);
    letterButton?.classList.add("disabled");
    letterButton?.setAttribute("disabled", "disabled");
  };

  return (
    <div className="flex items-center flex-wrap justify-center gap-4">
      {LETTERS.split("").map((letter) => (
        <Button
          key={letter}
          id={letter}
          variant={"secondary"}
          onClick={() => console.log("clicked")}
          disabled={false}
        >
          <p className="text-foreground/80 text-3xl font-bold uppercase">
            {letter}
          </p>
        </Button>
      ))}
    </div>
  );
};

export default Letters;
