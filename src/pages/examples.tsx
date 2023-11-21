import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import * as React from "react";
import { ChangeEvent, useEffect } from "react";

import ExampleView from "@/src/components/ExampleView/DocsExampleViewDynamic";
import { examples } from "@/src/content/examples";
import { getPageTitle } from "@/src/util";
import { CLIENT_TYPES } from "@/types/docs-reference";
import { Example, ExamplesByName } from "@/types/example";

const ExamplesPage = () => {
  // Check if there is a parameter and if yes, set the selected example
  const params = useSearchParams();
  const router = useRouter();

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

  const handleClick = React.useCallback((key: string) => {
    // set url param to the selected example
    router.push(`/examples/?example=${key}`);
    setSelectedExample(examples[key]);
  }, []);

  return (
    <>
      <Head>{getPageTitle("Examples")}</Head>
      <main
        id="about"
        className="mx-4 mt-28 flex flex-col border-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg xl:h-[calc(100vh-132px)] xl:flex-row"
      >
        <div className="order-1 flex-1 xl:order-first xl:flex-[0_1_350px]">
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
              placeholder="Search example"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className=" overflow-y-scroll border-editor-border bg-white p-6 pt-2 dark:border-editor-border-dark dark:bg-editor-bg xl:h-[calc(100vh-219px)] xl:border-r-[1px]">
            {Object.keys(exampleList).map((key) => {
              const currentExample = exampleList[key];
              const { name, description, image } = currentExample;
              const isSelected = selectedExample?.name === name;

              return (
                <div
                  key={key}
                  className={`border-box mt-4 cursor-pointer bg-[#F5F5F5] dark:bg-[#424242] xl:h-[225px] ${
                    isSelected ? "border-[2px] border-primary" : ""
                  }}`}
                  onClick={() => handleClick(key)}
                >
                  <div className="relative aspect-[1.60738255] h-[181px] w-full overflow-hidden">
                    <img
                      className="absolute top-1/2 w-full -translate-y-1/2"
                      src={image}
                      alt={name}
                    />
                  </div>
                  <p className="mt-3 px-4 text-sm">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-[0_0_calc(100vh-219px)] xl:flex-1">
          <ExampleView
            key={selectedExample?.name || "default"}
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
