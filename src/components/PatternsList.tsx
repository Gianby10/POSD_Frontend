"use client";
import React, { useEffect, useState } from "react";
import Pattern, { PatternSkeleton } from "./Pattern";
import axios from "axios";
import { PrivacyPattern } from "@/lib/types";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

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
  useEffect(() => {
    const fetchData = async () => {
      const { data: patterns } = await axios.get(
        "http://127.0.0.1:4444/api/privacy-patterns?populate[0]=gdpr_article"
      );

      setPatterns(patterns.data);
    };
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  return (
    <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-rows-[1fr] gap-4 mt-auto">
      {isLoading &&
        new Array(5).fill(1).map((_, i) => {
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
    </div>
  );
};

export default PatternsList;
