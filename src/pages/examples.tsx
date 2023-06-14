"use client";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import * as React from "react";
import { ChangeEvent, useEffect } from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
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
      <Breadcrumb pageName="Examples" />
      <Head>
        <title>Examples - MML</title>
      </Head>
      <main
        id="about"
        className="mx-auto flex h-[752px] border-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg lg:max-w-[1281px]"
      >
        <div className="flex-[0_1_350px]">
          <div className="h-[50px] border-b-[1px] border-editor-border bg-white px-[17px] pt-[14px] leading-[19px] text-black dark:border-editor-border-dark dark:bg-editor-bg dark:text-white">
            Examples
          </div>
          <div className="flex h-[35px] border-b-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg">
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
          <div className=" h-[664px] overflow-y-scroll p-6 pt-2">
            {Object.keys(exampleList).map((key) => {
              const currentExample = exampleList[key];
              const { name, description, image } = currentExample;
              const isSelected = selectedExample?.name === name;

              return (
                <div
                  key={key}
                  className={`border-box mt-4 h-[225px] cursor-pointer bg-[#F5F5F5] dark:bg-[#424242] ${
                    isSelected ? "border-[2px] border-primary" : ""
                  }}`}
                  onClick={() => handleClick(key)}
                >
                  <img
                    className="aspect-auto h-[181px] w-full"
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
