import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PatternsList from "@/components/PatternsList";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Check, ChevronsRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-10 pt-10">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto text-center flex flex-col items-center justify-center lg:items-start">
              <h1 className="w-fit tracking-tight text-balance font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Supporta lo sviluppo orientato alla{" "}
                <span className="bg-primary text-white">
                  privacy e alla sicurezza
                </span>
              </h1>
              <p className="mt-8 text-lg max-w-prose self-center text-center text-balance md:text-wrap">
                Esplora, Comprendi e Integra i{" "}
                <span className="font-semibold">
                  Privacy Pattern dalla Privacy Knowledge Base (PKB)
                </span>{" "}
                per Garantire la Conformità al{" "}
                <span className="font-semibold">GDPR</span> nel Tuo Software e
                Migliorare la Sicurezza dei Dati in Ogni Fase del Processo di
                Sviluppo
              </p>

              {/* <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Accesso ai Privacy Pattern: Consulta una vasta gamma di
                    pattern di privacy direttamente dalla Privacy Knowledge Base
                    (PKB).
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Facile Integrazione: Strumenti intuitivi per incorporare
                    elementi di privacy e sicurezza in ogni fase dello sviluppo
                    del software.
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Conformità GDPR: Supporto completo per assicurare che il
                    trattamento dei dati sia in linea con il regolamento GDPR.
                  </li>
                </div>
              </ul> */}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:pb-52">
          <div>
            <div className="flex justify-end items-center">
              <Link
                href="/patterns"
                className="text-xl hover:underline text-primary underline-offset-4"
              >
                Esplora tutti i patterns{" "}
                <ChevronsRight className="inline-block" />
              </Link>
            </div>

            <PatternsList />
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
