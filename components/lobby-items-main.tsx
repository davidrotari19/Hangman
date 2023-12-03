"use client";
import { db } from "@/firebase/config";
import LobbyItem from "@/components/lobby-item";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const LobbyItemsMain = () => {
  const [lobbys, setLobbys] = useState<DocumentData[]>([]);

  const getLobbys = async () => {
    const querySnapshot = await getDocs(collection(db, "lobbys"));
    querySnapshot.forEach((doc) => {
      setLobbys((prev) => [...prev, { lobby: doc.data(), id: doc.id }]);
    });
  };

  useEffect(() => {
    getLobbys();
  }, []);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 w-full">
      {lobbys.map((lobby: any) => (
        <LobbyItem
          key={lobby?.id}
          title={lobby?.lobby?.title}
          question={lobby?.lobby?.question}
          players={lobby?.lobby?.players?.length || 0}
          slug={lobby?.id}
        />
      ))}
    </div>
  );
};

export default LobbyItemsMain;
