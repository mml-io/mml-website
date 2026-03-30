import { useSearchParams } from "next/navigation";
import * as React from "react";
import { ChangeEvent, useEffect } from "react";

import ExampleView from "@/src/components/ExampleView/DocsExampleViewDynamic";
import PageMeta from "@/src/components/PageMeta";
import { examples } from "@/src/content/examples";
import { CLIENT_TYPES } from "@/types/docs-reference";
import { Example, ExamplesByName } from "@/types/example";

import { ExampleLink } from "../components/ExampleLink/ExampleLink";

const ExamplesPage = () => {
  // Check if there is a parameter and if yes, set the selected example
  const params = useSearchParams();

  const example = params.get("example");

  const [exampleList, setExampleList] = React.useState<ExamplesByName>(examples);
  const [selectedExample, setSelectedExample] = React.useState<Example | undefined>();
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  useEffect(() => {
    if (example) {
      setSelectedExample(examples[example]);
    } else {
      setSelectedExample(Object.values(examples)[0]);
    }
  }, [example]);

  const handleSearch = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const query = (e.target as HTMLInputElement).value;

    const filteredExamples = Object.keys(examples).filter((example) => {
      const { name, description } = examples[example];
      return name.includes(query) || description.includes(query);
    });

    const filteredExampleList: ExamplesByName = {};

    filteredExamples.forEach((example) => {
      filteredExampleList[example] = examples[example];
    });

    setExampleList(filteredExampleList);
    setSearchQuery(query);
  }, []);

  return (
    <>
      <PageMeta
        title="Examples"
        description="Interactive examples of MML elements and features."
        path="/examples"
      />
      <main
        id="about"
        className="container mt-28 grid grid-cols-1 gap-4 xl:grid-cols-[280px_1fr] xl:h-[calc(100vh-144px)]"
      >
        <div className="order-1 xl:order-first card overflow-hidden flex flex-col">
          <div className="p-4 text-sm font-semibold shrink-0">Examples</div>
          <div className="flex items-center border-t border-black/10 dark:border-white/10 px-3 shrink-0">
            <img
              className="relative left-0 filter-none dark:invert"
              src="/images/examples/search.svg"
              alt="search"
              width={14}
              height={14}
            />
            <input
              className="ml-2 h-9 w-full bg-transparent text-sm outline-0 placeholder:opacity-50"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="overflow-y-auto p-2 flex-1">
            {Object.keys(exampleList).map((key) => {
              const currentExample = exampleList[key];
              const { name, description, image } = currentExample;
              const isSelected = selectedExample?.name === name;

              return (
                <ExampleLink
                  key={key}
                  exampleId={key}
                  isSelected={isSelected}
                  image={image}
                  name={name}
                  description={description}
                />
              );
            })}
          </div>
        </div>
        <div className="overflow-hidden card h-[70vh] xl:h-auto">
          <ExampleView
            key={selectedExample?.name}
            initialClients={selectedExample?.clients ?? [CLIENT_TYPES.FLOATING]}
            code={selectedExample?.code || ""}
            baseScene={
              typeof selectedExample?.baseScene === "boolean" ? selectedExample?.baseScene : true
            }
            description={
              selectedExample?.description ||
              "Select one of the examples on the left to see it here"
            }
            noBorders
          />
        </div>
      </main>
    </>
  );
};

export default ExamplesPage;
