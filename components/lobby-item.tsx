import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogIn } from 'lucide-react';
import Link from "next/link";

const LobbyItem = ({title, question, players, slug}: any) => {

  return (
    <div className="flex flex-col gap-4 border border-foreground/10 rounded-xl p-4 w-full">
      <h2 className="text-foreground/90 text-2xl font-bold mb-0">
        {title}{" "}
        <span className="text-foreground/60 text-sm">({players} / 4 jucatori)</span>
      </h2>
      <Separator />
      <p className="text-md text-muted-foreground mt-0 ">
        <span className="text-muted-foreground/70 text-sm">Intrebare: </span><br />
        {question}
      </p>
      <Button
        variant={"default"}
        size={"lg"}
        className="flex items-center gap-3"
        asChild
      >
        <Link href={`/${slug}`}>
        Intră <LogIn size={18} />
        </Link>
      </Button>
    </div>
  );
};

export default LobbyItem;
