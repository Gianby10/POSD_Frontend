"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  addDislike,
  addLike,
  removeDislike,
  removeLike,
} from "@/lib/actions/pkb-actions";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

type Props = {
  userId?: number;
  likes?: number;
  dislikes?: number;
  userFeedback: boolean | undefined;
  patternId: string;
};

const AddFeedback = ({
  userId,
  likes,
  dislikes,
  userFeedback,
  patternId,
}: Props) => {
  const { toast } = useToast();
  const feedbackPositive = async () => {
    if (!userId) {
      toast({
        title: "Errore",
        description: "Effettua l'accesso per lasciare un feedback!",
        variant: "destructive",
      });
      return;
    }
    if (userFeedback === true) {
      await removeLike(userId, patternId);
    } else if (userFeedback === undefined) {
      await addLike(userId, patternId);
    }
  };

  const feedbackNegative = async () => {
    if (!userId) {
      toast({
        title: "Errore",
        description: "Effettua l'accesso per lasciare un feedback!",
        variant: "destructive",
      });
      return;
    }
    if (userFeedback === false) {
      await removeDislike(userId, patternId);
    } else if (userFeedback === undefined) {
      await addDislike(userId, patternId);
    }
  };

  console.log(userFeedback);
  return (
    <div className="p-8 bg-slate-100 rounded-xl mt-4">
      <p className="text-center mb-3">Hai trovato questa pagina utile?</p>
      <div className="flex justify-center items-center gap-3">
        <Button
          onClick={feedbackPositive}
          variant="outline"
          className={cn("", {
            "bg-emerald-500/65": userFeedback,
          })}
        >
          <ThumbsUp className="mr-2" />
          {likes || "Si"}
        </Button>
        <Button
          onClick={feedbackNegative}
          variant="outline"
          className={cn("", {
            "bg-red-500/65": userFeedback === false,
          })}
        >
          <ThumbsDown className="mr-2" />
          {dislikes || "No"}
        </Button>
      </div>
    </div>
  );
};

export default AddFeedback;
