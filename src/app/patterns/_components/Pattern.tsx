import React from "react";

import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  titolo: string;
  descrizione: string;
  id: number;
  articoliGdpr?: { attributes: { nome: string; numero: number } }[];
  className?: string;
};

const Pattern = ({
  titolo,
  descrizione,
  id,
  articoliGdpr,
  className,
}: Props) => {
  return (
    <div className={className}>
      <Link href={`/patterns/${id}`} className="group">
        <Card className="shadow-xl h-full flex flex-col justify-between group-hover:bg-slate-100 group-hover:-translate-y-2 transition-all">
          <div className="p-6 flex flex-col gap-2">
            <CardTitle>{titolo}</CardTitle>
            <CardDescription className="line-clamp-3 ">
              {descrizione}
            </CardDescription>
          </div>
          <div className="w-full p-4">
            <p className="text-muted-foreground text-sm">
              Articoli GDPR interessati:
            </p>
            <div className="bg-primary/30 rounded-sm p-2 flex justify-start gap-2 text-white">
              <TooltipProvider>
                {articoliGdpr &&
                  articoliGdpr.map(({ attributes }) => (
                    <Tooltip key={attributes.numero}>
                      <TooltipTrigger>
                        <div className="bg-primary/80 rounded-sm px-2 py-1 hover:text-zinc-200">
                          Articolo {attributes.numero}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        Art. {attributes.numero} - {attributes.nome}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                {!articoliGdpr?.length && (
                  <div className="bg-primary/80 rounded-sm px-2 py-1">
                    Nessuno
                  </div>
                )}
              </TooltipProvider>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default Pattern;

export const PatternSkeleton = () => {
  return (
    <Card className="shadow-xl h-full flex flex-col justify-between group-hover:bg-slate-100 group-hover:-translate-y-2 transition-all">
      <div className="p-6 flex flex-col gap-8">
        <CardTitle>
          <Skeleton className="w-[200px] h-4 max-w-full" />
        </CardTitle>
        <CardDescription className="flex flex-col gap-2">
          <Skeleton className="h-4 max-w-full" />
          <Skeleton className="h-4 max-w-full" />
        </CardDescription>
      </div>
      <div className="w-full p-4">
        <Skeleton className="w-[120px] h-4 max-w-full mb-2" />
        <div className="bg-primary/30 rounded-sm p-2 flex items-center gap-2 text-white">
          <Skeleton className="flex-1 h-6 max-w-full" />
          <Skeleton className="flex-1 h-6 max-w-full" />
          <Skeleton className="flex-1 h-6 max-w-full" />
        </div>
      </div>
    </Card>
  );
};
