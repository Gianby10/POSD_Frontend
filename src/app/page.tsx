"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [patterns, setPatterns] = useState<
    {
      attributes: { titolo: string; descrizione: string };
    }[]
  >([]);
  useEffect(() => {
    const fetchPatterns = async () => {
      const a = await fetch("http://127.0.0.1:4444/api/patterns");
      const data = await a.json();
      console.log(data.data);
      setPatterns(data.data);
    };
    fetchPatterns();
  }, []);

  return (
    <div>
      {patterns.map((pattern) => (
        <div className="p-8 bg-white/65 text-black">
          <h1>{pattern.attributes.titolo}</h1>
          <p>{pattern.attributes.descrizione}</p>
        </div>
      ))}
    </div>
  );
}
