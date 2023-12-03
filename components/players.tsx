import { Separator } from "@/components/ui/separator";

import Image from "next/image";
import React from "react";

const Players = ({
  players,
  currentTurn,
}: {
  players: any;
  currentTurn: any;
}) => {


  return (
    <div className="flex flex-col items-center gap-2 my-6">
      <h2 className="text-foreground/50 text-md">Jucători</h2>
      <div className="flex gap-8  flex-wrap items-center justify-center">
        {players.map((player: any) => (
          <Player
            key={player.id}
            name={player.name}
            isCurrent={players[currentTurn]?.id === player.id}
          />
        ))}
      </div>
      <Separator className="w-full mt-6" />
    </div>
  );
};

const Player = ({ name, isCurrent }: { name: string; isCurrent: boolean }) => {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={"/user.webp"}
        alt={name}
        width={40}
        height={40}
        className={`rounded-full aspect-square object-cover ring ${
          isCurrent ? "ring-orange-500" : "ring-blue-500/20"
        } ring-offset-transparent ring-offset-2`}
      />
      <p
        className={`text-foreground/60 text-sm ${
          isCurrent ? "text-orange-500" : "text-foreground/60"
        }`}
      >
        {name}
      </p>
    </div>
  );
};

export default Players;
