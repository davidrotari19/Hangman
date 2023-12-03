"use client";
import { db } from "@/firebase/config";
import Letters from "@/components/letters";
import Players from "@/components/players";
import { Button } from "@/components/ui/button";
import Word from "@/components/word-item";
import { useAuthContext } from "@/context/AuthContext";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

export default async function Home({ params }: { params: { lobby: string } }) {
  const [data, setData] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext() as any;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
    const playersRef = doc(db, "lobbys", params?.lobby);

    (async () => {
      user &&
        (await updateDoc(playersRef, {
          players: arrayUnion({
            id: user?.uid,
            name: user?.displayName,
          }),
        }));
    })();

    const unsubscribe = onSnapshot(doc(db, "lobbys", params?.lobby), (doc) => {
      setData(doc.data());
    });
    setLoading(false);
    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleLeave = async () => {
    router.push("/");
    const playersRef = doc(db, "lobbys", params?.lobby);

    user &&
      (await updateDoc(playersRef, {
        players: arrayRemove({
          id: user?.uid,
          name: user?.displayName,
        }),
      }));
  };

  return (
    <>
      <p className="text-muted-foreground text-sm ">
        {params?.lobby ? `${params?.lobby}` : "Slug: 1"}
      </p>
      <Word word={data?.currentAnswer} correct={data?.answer} />
      <p className="text-foreground/90 text-xl mt-6">
        {data?.currentQuestion || "Intrebare"}
      </p>
      <Players
        players={data?.players || players}
        currentTurn={data?.currentTurn}
      />
      <Letters
        currentTurn={data?.currentTurn}
        lobby={params?.lobby}
        players={data?.players}
      />

      <Button
        variant={"destructive"}
        size={"sm"}
        className="mt-6"
        onClick={handleLeave}
      >
        Paraseste jocul
      </Button>
    </>
  );
}
