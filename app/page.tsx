import LobbyHeader from "@/components/lobby-header";
import LobbyItemsMain from "@/components/lobby-items-main";

import { Separator } from "@/components/ui/separator";
const players = [
  {
    id: 1,
    image: "/user.webp",
    name: "John Doe",
  },
  {
    id: 2,
    image: "/user1.webp",
    name: "Randy Orton",
  },
  {
    id: 3,
    image: "/user2.jpg",
    name: "John Cena",
  },
];

export default function Home() {
  return (
    <>
      <h1 className="text-foreground/90 text-4xl font-bold mb-0">Lobby</h1>
      <p className="text-md text-muted-foreground mt-0 mb-4 text-center">
        Alege un lobby sau creează unul nou pentru a începe jocul.
      </p>
      <LobbyHeader />
      <Separator />
      <LobbyItemsMain />
    </>
  );
}
