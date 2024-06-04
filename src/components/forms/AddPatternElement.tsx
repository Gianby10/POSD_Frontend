"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Plus } from "lucide-react";
import AddArticleForm from "./AddArticleForm";
import AddWeaknessForm from "./AddWeaknessForm";

type Props = {
  type: "article" | "weakness";
};

const AddPatternElement = ({ type }: Props) => {
  const closeDialog = () => setIsModalOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let form;
  let name;
  switch (type) {
    case "article":
      form = <AddArticleForm closeDialog={closeDialog} />;
      name = "articolo GDPR";
      break;
    case "weakness":
      name = "vulnerabilità CWE";
      form = <AddWeaknessForm closeDialog={closeDialog} />;
      break;
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className="">
        <Plus className="h-5 w-5 text-blue-950 hover:text-primary" />
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-full justify-center flex-col">
          <h2 className="font-bold text-gray-900 text-xl">Aggiungi {name}</h2>
          <p className="text-muted-foreground text-sm">
            Dopo essere stato inviato, un amministratore confermerà le
            informazioni e in caso queste siano corrette, la {name} sarà
            accessibile a tutti i visitatori del sito.
          </p>
        </div>

        <div className="mt-4">{form}</div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatternElement;
