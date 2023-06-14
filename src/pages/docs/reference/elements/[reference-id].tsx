import { createSchemaDefinition, schemaJSON } from "@mml-io/mml-schema";
import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import LinkList from "@/src/components/Common/LinkList";
import Navigation from "@/src/components/Common/Navigation";
import { Attribute } from "@/src/components/Docs/Attribute";
import { AttributeGroup } from "@/src/components/Docs/AttributeGroup";
import { MarkDown } from "@/src/config/mdx";
import * as docsExamples from "@/src/content/docs";

// This function gets called at build time to generate all the files
export function getStaticPaths() {
  // Call an external API endpoint to get posts

  // Filter the element to only those that start with "m-" for now
  const elements = Object.values(schemaDefinition.elements)
    .filter((element) => element.name.startsWith("m-"))
    .map((element) => element.name);

  // Get the paths we want to pre-render based on elements
  const paths = elements.map((element) => ({
    params: { "reference-id": element },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export function getStaticProps({ params }) {
  // params contains the element returned by getStaticPaths
  const referenceId = params["reference-id"];

  // Pass post data to the page via props
  return { props: { referenceId } };
}

const ExampleView = dynamic(
  () => import("@/src/components/ExampleView/DocsExampleView").then((mod) => mod.DocsExampleView),
  {
    ssr: false,
  },
);

const schemaDefinition = createSchemaDefinition(schemaJSON);

const DocsPage = ({ referenceId }: { referenceId: string }) => {
  const elementDefinition = schemaDefinition.elements[referenceId];

  const attributes = Object.values(elementDefinition.attributes);
  const attributeGroups = Object.values(elementDefinition.attributeGroups);

  let primaryExample = null;
  const examplesForElement = docsExamples.examples[referenceId];
  if (examplesForElement && examplesForElement.examples.primary) {
    primaryExample = examplesForElement.examples.primary;
  }

  const filteredExamples = examplesForElement
    ? Object.keys(examplesForElement.examples).filter((key) => key !== "primary")
    : [];

  return (
    <>
      <Breadcrumb
        pageName={`${elementDefinition.name}`}
        parents={[
          { name: "Docs", path: "docs" },
          { name: "Reference", path: "reference" },
          { name: "Elements", path: "elements" },
        ]}
      />
      <Head>
        <title>{elementDefinition.name} - MML</title>
      </Head>
      <div className="mx-auto sm:max-w-[575px] md:max-w-[768px] lg:max-w-[1281px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1300px]">
        <div className="flex w-full">
          <Navigation />
          <main className="w-full flex-1 p-5 lg:flex-[1_0_766px]">
            <h1 className="mb-8 text-[40px] font-semibold uppercase">{elementDefinition.name}</h1>
            {elementDefinition.description &&
              elementDefinition.description.map((descriptionText, index) => (
                <MarkDown className="mb-4" key={index}>
                  {descriptionText}
                </MarkDown>
              ))}
            <h2 className="mb-4 mt-8 text-[32px] font-medium" id="try it">
              Try it
            </h2>
            {primaryExample && (
              <ExampleView
                description="Demo"
                key={`${referenceId}-primary`}
                baseScene={
                  primaryExample.baseSceneOn !== undefined ? primaryExample.baseSceneOn : true
                }
                code={primaryExample.code}
                initialClientCount={1}
              />
            )}
            {attributes && (
              <>
                <h2 id="attributes" className="mb-4 mt-8 text-[32px] font-medium">
                  Attributes
                </h2>
                <code className="bg-gray-200 text-red-800 rounded p-1 font-mono">
                  <ul>
                    {attributes.map((attribute) => (
                      <li key={attribute.name}>
                        <Attribute attribute={attribute} />
                      </li>
                    ))}
                  </ul>
                </code>
              </>
            )}
            {attributeGroups && (
              <>
                <h2 className="mb-4 mt-8 text-[32px] font-medium" id="attribute groups">
                  Attribute Groups
                </h2>
                <code>
                  <ul className="bg-gray-200 text-red-800 rounded p-1 font-mono">
                    {attributeGroups.map((attributeGroup) => (
                      <li key={attributeGroup}>
                        <AttributeGroup attributeGroupName={attributeGroup} />
                      </li>
                    ))}
                  </ul>
                </code>
              </>
            )}
            {filteredExamples.length > 0 && (
              <>
                <h2 id="examples" className="mb-4 mt-8 text-[32px] font-medium">
                  Examples
                </h2>
                {filteredExamples.map((exampleKey) => {
                  const example = examplesForElement.examples[exampleKey];
                  return (
                    <div key={`${referenceId}-${example.title}`}>
                      <h3 className="mb-4 mt-8 text-[24px] font-medium">{example.title}</h3>
                      <MarkDown>{`${example.description}`}</MarkDown>
                      <ExampleView
                        description={example.title}
                        baseScene={example.baseSceneOn !== undefined ? example.baseSceneOn : true}
                        code={example.code}
                        initialClientCount={1}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </main>
          <LinkList elementList={["try it", "attributes", "attribute groups", "examples"]} />
        </div>
      </div>
    </>
  );
};

export default DocsPage;
