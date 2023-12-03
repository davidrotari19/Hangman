"use client";
import React, { useEffect, useState } from "react";

const Word = ({ word, correct }: { word: string; correct: string }) => {
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    try {
      setLetters(correct.split(""));
    } catch (e) {
      console.log(e);
    }
  }, [word]);

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {letters.map((letter) => (
        <Letter letter={letter} key={Math.random().toString(36).substring(7)} />
      ))}
    </div>
  );
};

const Letter = ({ letter }: { letter: string }) => {
  return (
    <div
      className={`w-20 h-20 rounded-lg  flex items-center justify-center ${
        letter === " " ? "bg-foreground/5" : "bg-foreground/10"
      }`}
    >
      <p className="text-foreground/80 text-5xl font-bold uppercase"></p>
    </div>
  );
};

export default Word;
