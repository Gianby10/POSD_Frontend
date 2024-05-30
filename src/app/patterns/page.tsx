import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PatternsList from "./_components/PatternsList";

type Props = {};

const PatternsPage = async (props: Props) => {
  return (
    <section className="py-14">
      <MaxWidthWrapper>
        <div className="">
          <h3 className="tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
            Patterns
          </h3>
        </div>

        <PatternsList />
      </MaxWidthWrapper>
      ;
    </section>
  );
};

export default PatternsPage;
