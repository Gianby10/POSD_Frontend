"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { PrivacyPattern } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Pattern, { PatternSkeleton } from "./Pattern";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import qs from "qs";
import { useDebounce } from "use-debounce";
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
  const [filters, setFilters] = useState<{
    title: string;
  }>({
    title: "",
  });
  const [debouncedSearchTerm] = useDebounce(filters.title, 500);
  console.log(debouncedSearchTerm);
  const query = qs.stringify(
    {
      populate: "*",
      filters: {
        titolo: {
          $startsWithi: debouncedSearchTerm[0],
        },
      },
    },
    { encode: false }
  );

  const getPatterns = useCallback(() => {
    const fetchData = async () => {
      try {
        const { data: patterns, status } = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/privacy-patterns?${query}`
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
  }, [query]);

  useEffect(() => {
    getPatterns();
  }, [error, query]);

  return (
    <div className="pt-6 grid grid-cols-1 lg:grid-cols-4 auto-rows-[1fr] gap-4 mt-auto">
      <div className="h-full w-full border-r-gray-200 lg:border-r-2 p-6">
        <h3 className="font-bold text-xl">Filtri di ricerca</h3>
        <div className="flex flex-col gap-1 mt-8">
          <p>Cerca un pattern per titolo: </p>
          <div className="relative">
            <Input
              className="p-2 pr-16"
              value={filters.title}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
        </div>
      </div>
      <div className="col-span-3 space-y-2">
        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
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
    </div>
  );
};

export default PatternsList;
