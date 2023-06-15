"use client";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import * as React from "react";
import { ChangeEvent, useEffect } from "react";

import ExampleView from "@/src/components/ExampleView/ExamplePageExampleViewDynamic";
import { examples } from "@/src/content/examples";
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
      <Head>
        <title>Examples - MML</title>
      </Head>
      <main
        id="about"
        className="mx-4 mt-28 flex h-[752px] max-w-[450px] flex-col border-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg sm:mx-auto sm:max-w-[575px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] xl:flex-row 2xl:max-w-[1300px]"
      >
        <div className="order-1 flex-1 xl:order-first xl:flex-[0_1_350px]">
          <div className="h-[50px] border-b-[1px] border-editor-border bg-white px-[17px] pt-[14px] leading-[19px] text-black dark:border-editor-border-dark dark:bg-editor-bg dark:text-white">
            Examples
          </div>
          <div className="order-first flex h-[35px] border-b-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg xl:order-1">
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
          <div className=" overflow-y-scroll p-6 pt-2 xl:h-[664px]">
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
                  <img
                    className="aspect-auto w-full xl:h-[181px]"
                    src={image}
                    alt={name}
                    width={301}
                    height={181}
                  />
                  <p className="mt-3 px-4 text-sm">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-full flex-1">
          <ExampleView
            key={selectedExample?.name || "default"}
            initialClientCount={1}
            code={selectedExample?.code || ""}
            baseScene={true}
            description={
              selectedExample?.description ||
              "Select one of the examples on the left to see it here"
            }
          />
        </div>
      </main>
    </>
  );
};

export default ExamplesPage;
