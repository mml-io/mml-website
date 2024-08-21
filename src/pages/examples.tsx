import Head from "next/head";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { ChangeEvent, useEffect } from "react";

import ExampleView from "@/src/components/ExampleView/DocsExampleViewDynamic";
import { examples } from "@/src/content/examples";
import { getPageTitle } from "@/src/util";
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
      <Head>{getPageTitle("Examples")}</Head>
      <main
        id="about"
        className="mx-4 mt-28 flex flex-col rounded border-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg xl:h-[calc(100vh-132px)] xl:flex-row"
      >
        <div className="order-1 flex-1 overflow-hidden rounded-t xl:order-first xl:flex-[0_1_350px]">
          <div className="h-[50px] bg-white px-[17px] pt-[14px] leading-[19px] text-black dark:bg-editor-bg dark:text-white">
            Examples
          </div>
          <div className="order-first flex h-[35px] border-y-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg xl:order-1">
            <img
              className="relative left-[15px] filter-none dark:invert"
              src="/images/examples/search.svg"
              alt="reset"
              width={14}
              height={14}
            />
            <input
              className="h-full w-full bg-transparent px-6 text-[13px] outline-0"
              placeholder="Search examples..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className=" overflow-y-scroll rounded-b border-editor-border bg-white p-6 pt-2 dark:border-editor-border-dark dark:bg-editor-bg xl:h-[calc(100vh-219px)] xl:border-r-[1px]">
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
        <div className="flex-[0_0_calc(100vh-219px)] overflow-hidden xl:flex-1 xl:rounded-b">
          <ExampleView
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
