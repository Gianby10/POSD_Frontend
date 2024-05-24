import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PatternsListPreview from "@/components/PatternsListPreview";

import { ChevronsRight } from "lucide-react";
import Link from "next/link";

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
          </div>

          <PatternsListPreview />
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
