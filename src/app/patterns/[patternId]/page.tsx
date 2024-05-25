import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import axios from "axios";
import React, { useCallback } from "react";
import qs from "qs";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Info, Ribbon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
type Props = {
  params: {
    patternId: string;
  };
};
const query = qs.stringify(
  {
    populate: "*",
  },
  { encode: false }
);
const PatternIdPage = async ({ params }: Props) => {
  const patternId = params.patternId;
  const { data: pattern, status } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/privacy-patterns/${patternId}?${query}`
  );
  const patternData = {
    title: pattern.data.attributes.titolo,
    description: pattern.data.attributes.descrizione,
    context: pattern.data.attributes.contesto,
    collocazioneMVC: pattern.data.attributes.collocazione_MVC,
    problem: pattern.data.attributes.problema,
    solution: pattern.data.attributes.soluzione,
    example: pattern.data.attributes.esempio,
    faseISO9241210: pattern.data.attributes.fase_ISO_9241_210,
    privacyStrategies: pattern.data.attributes.privacy_strategy.data,
    gdprArticles: pattern.data.attributes.gdpr_article.data,
    privacyPrinciples: pattern.data.attributes.privacy_principle.data,
    cweWeaknesses: pattern.data.attributes.cwe_weakness.data,
  };

  console.log(patternData);

  return (
    <section>
      <MaxWidthWrapper className="mt-10 p-4">
        <div>
          <Link
            href="/patterns"
            className="text-primary flex items-center hover:underline underline-offset-4"
          >
            <ArrowLeft />
            Torna alla lista dei patterns
          </Link>
        </div>
        <div className="flex mt-6 flex-col lg:flex-row">
          <div className="max-w-prose">
            <h1 className="tracking-tight text-balance !leading-tight font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900">
              {patternData.title}
            </h1>
            <p className="text-muted-foreground">{patternData.description}</p>

            <h3 className="mt-6 text-3xl font-semibold">Context</h3>
            <p>{patternData.context}</p>

            <h3 className="mt-6 text-3xl font-semibold">Collocazione MVC</h3>
            <p>{patternData.collocazioneMVC}</p>

            <h3 className="mt-6 text-3xl font-semibold">Problema</h3>
            <p>{patternData.problem}</p>

            <h3 className="mt-6 text-3xl font-semibold">Soluzione</h3>
            <p>{patternData.solution}</p>

            <h3 className="mt-6 text-3xl font-semibold">Esempi</h3>
            <p>{patternData.example}</p>
          </div>

          <div className="mt-10 lg:ml-12 justify-self-end">
            <h3 className="mt-6 text-3xl font-semibold">
              Articoli GDPR interessati
            </h3>
            <div className="space-y-4">
              {patternData.gdprArticles.length > 0 ? (
                patternData.gdprArticles.map(
                  (articolo: {
                    attributes: {
                      nome: string;
                      numero: number;
                      link: string;
                    };
                  }) => {
                    return (
                      <div>
                        <Link
                          href={articolo.attributes.link}
                          className="text-primary hover:underline"
                          target="_blank"
                        >
                          <ExternalLink className="mr-2 h-4 w-4 inline-block" />
                          Articolo {articolo.attributes.numero} -{" "}
                          {articolo.attributes.nome}
                        </Link>
                      </div>
                    );
                  }
                )
              ) : (
                <div>Nessun articolo.</div>
              )}
            </div>

            {/*  */}

            <h3 className="mt-6 text-3xl font-semibold">Privacy Strategies</h3>
            <div className="space-y-4">
              {patternData.privacyStrategies.length > 0 ? (
                patternData.privacyStrategies.map(
                  (strategy: {
                    attributes: { nome: string; descrizione: string };
                  }) => {
                    return (
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            {strategy.attributes.nome}
                          </AccordionTrigger>
                          <AccordionContent>
                            {strategy.attributes.descrizione}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                )
              ) : (
                <div>Nessuna strategy.</div>
              )}
            </div>

            <h3 className="mt-6 text-3xl font-semibold">Privacy Principles</h3>
            <div className="space-y-4">
              {patternData.privacyPrinciples.length > 0 ? (
                patternData.privacyPrinciples.map(
                  (strategy: {
                    attributes: { titolo: string; descrizione: string };
                  }) => {
                    return (
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            {strategy.attributes.titolo}
                          </AccordionTrigger>
                          <AccordionContent>
                            {strategy.attributes.descrizione}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                )
              ) : (
                <div>Nessuna strategy.</div>
              )}
            </div>

            <h3 className="mt-6 text-3xl font-semibold">Vulnerabilità CWE</h3>
            <div className="space-y-4">
              {patternData.cweWeaknesses.length > 0 ? (
                patternData.cweWeaknesses.map(
                  (cweWeakness: {
                    attributes: {
                      nome: string;
                      numero: number;
                      descrizione: string;
                    };
                  }) => {
                    return (
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            CWE-{cweWeakness.attributes.numero}:{" "}
                            {cweWeakness.attributes.nome}
                          </AccordionTrigger>
                          <AccordionContent>
                            {cweWeakness.attributes.descrizione}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                )
              ) : (
                <div>Nessuna vulnerabilità CWE.</div>
              )}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default PatternIdPage;
