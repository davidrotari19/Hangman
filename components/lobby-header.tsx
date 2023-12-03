"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FilePlus2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useState } from "react";
import { auth } from "@/firebase/config";
const LobbyHeader = () => {
  const [success, setSuccess] = useState(false);

  const handleCreateLobby = async (e) => {
    e.preventDefault();
    const { name } = e.target.elements;

    try {
      await addDoc(collection(db, "lobbys"), {
        title: name.value,
        currentQuestion: "Cine este cel mai bun?",
        currentAnswer: "",
        answer: "John Cena",
        maxPlayers: 4,
        players: [],
        winner: null,
        started: false,
        createdAt: serverTimestamp(),
        createdBy: auth?.currentUser?.uid || null,
        currentTurn: 0,
      });

      setSuccess(true);
    } catch (e) {
      setSuccess(false);
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <h2 className="text-foreground/90 text-xl font-bold mb-0">
        Lobby-uri publice
      </h2>
      <Dialog>
        <DialogTrigger>
          <p className="text-sm text-muted-foreground mt-0 mb-2 flex items-center gap-2">
            Creează un lobby <FilePlus2 size={18} />
          </p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Creează lobby</DialogTitle>
            <DialogDescription>
              Creează un lobby nou pentru a juca cu prietenii.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          {success && (
            <p className="text-green-500 text-sm font-semibold text-center">
              Lobby-ul a fost creat cu succes! Poți să îl accesezi din pagina
              principală.
            </p>
          )}
          <form className="flex flex-col gap-4" onSubmit={handleCreateLobby}>
            <Input placeholder="Nume lobby" name="name" disabled={success} />
            <Button
              variant={"default"}
              size={"lg"}
              type="submit"
              disabled={success}
            >
              Creează
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LobbyHeader;
