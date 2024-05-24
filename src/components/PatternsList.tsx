"use client";
import React, { useCallback, useEffect, useState } from "react";
import Pattern, { PatternSkeleton } from "./Pattern";
import axios from "axios";
import { PrivacyPattern } from "@/lib/types";
import { Button } from "./ui/button";

const PatternsList = () => {
  const [patterns, setPatterns] = useState<
    {
      id: number;
      attributes: PrivacyPattern & {
        gdpr_article: {
          data: { id: number; attributes: { nome: string; numero: number } }[];
        };
      };
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPatterns = useCallback(() => {
    const fetchData = async () => {
      try {
        const { data: patterns, status } = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/privacy-patterns?populate[0]=gdpr_article`
        );

        setPatterns(patterns.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getPatterns();
  }, [error]);

  return (
    <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-rows-[1fr] gap-4 mt-auto">
      {isLoading &&
        new Array(6).fill(1).map((_, i) => {
          return <PatternSkeleton key={i} />;
        })}
      {!isLoading &&
        patterns.map(({ id, attributes }) => {
          return (
            <Pattern
              titolo={attributes.titolo}
              descrizione={attributes.descrizione}
              id={id}
              articoliGdpr={attributes.gdpr_article?.data}
              key={id}
            />
          );
        })}
      {!isLoading && error && (
        <div className="flex justify-center col-span-full">
          <div className="border-red-300 border p-2 rounded-lg bg-red-200 flex flex-col justify-center">
            <p>Errore nel caricamento dei pattern</p>
            <Button
              onClick={() => {
                setError(false);
              }}
              variant={"ghost"}
            >
              Riprova
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatternsList;
