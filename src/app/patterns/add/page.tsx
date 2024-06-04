import AddPatternForm from "@/components/forms/AddPatternForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getUserMeLoader } from "@/lib/auth";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const getArticoli = async () => {
  const { data: articoli, status } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/gdpr-articles`
  );
  return articoli.data.sort((a: any, b: any) => {
    if (a.attributes.numero > b.attributes.numero) return 1;
    return -1;
  });
};

const getStrategies = async () => {
  const { data: strategies, status } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/privacy-strategies`
  );
  return strategies.data;
};

const getPrinciples = async () => {
  const { data: principles, status } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/privacy-principles`
  );
  return principles.data;
};

const getWeaknesses = async () => {
  const { data: weaknesses, status } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/cwe-weaknesses`
  );
  return weaknesses.data.sort((a: any, b: any) => {
    if (a.attributes.numero > b.attributes.numero) return 1;
    return -1;
  });
};

const getOwaspCategories = async () => {
  const { data: owasp, status } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/owasp-categories`
  );
  return owasp.data.sort((a: any, b: any) => {
    if (a.attributes.numero > b.attributes.numero) return 1;
    return -1;
  });
};

const AddPatternPage = async (props: Props) => {
  const user = await getUserMeLoader();
  if (!user.ok) redirect("/");
  let articles = [];
  let strategies = [];
  let principles = [];
  let weaknesses = [];
  let owaspCategories = [];
  try {
    articles = await getArticoli();
    strategies = await getStrategies();
    principles = await getPrinciples();
    weaknesses = await getWeaknesses();
    owaspCategories = await getOwaspCategories();
  } catch (error) {
    redirect("/");
  }

  return (
    <section className="py-14">
      <MaxWidthWrapper>
        <div className="">
          <h3 className="tracking-tight text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
            Aggiungi un pattern
          </h3>
          <p className="mt-2 md:text-lg md:max-w-prose text-balance md:text-wrap text-muted-foreground">
            Suggerisci un pattern tramite il seguente modulo. Dopo essere stato
            inviato, un amministratore confermerà le informazioni e in caso
            queste siano corrette, il pattern sarà accessibile a tutti i
            visitatori del sito.
          </p>
        </div>
        <AddPatternForm
          articles={articles}
          strategies={strategies}
          principles={principles}
          weaknesses={weaknesses}
          owaspCategories={owaspCategories}
        />
      </MaxWidthWrapper>
    </section>
  );
};

export default AddPatternPage;
