import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

type Props = {};

const PatternsPage = (props: Props) => {
  return (
    <section className="py-14 bg-slate-100">
      <MaxWidthWrapper>
        <div>
          <h3 className="tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
            Patterns
          </h3>
        </div>
      </MaxWidthWrapper>
      ;
    </section>
  );
};

export default PatternsPage;
