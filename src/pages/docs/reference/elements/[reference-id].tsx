import { createSchemaDefinition, schemaJSON } from "@mml-io/mml-schema";
import Head from "next/head";
import * as React from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import LinkList from "@/src/components/Common/LinkList";
import ReferenceNavigation from "@/src/components/Common/ReferenceNavigation";
import CompatibilityTable from "@/src/components/CompatibilityTable";
import { Attribute } from "@/src/components/Docs/Attribute";
import { AttributeGroup } from "@/src/components/Docs/AttributeGroup";
import ExampleView from "@/src/components/ExampleView/DocsExampleViewDynamic";
import { MarkDownDocs } from "@/src/config/mdx";
import * as docsExamples from "@/src/content/docs";
import { getPageTitle } from "@/src/util";
import { CLIENT_TYPES } from "@/types/docs-reference";

import { AnchorLink } from "../../../../components/Anchors/AnchorLink";

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
export function getStaticProps({ params }: { params: { "reference-id": string } }) {
  // params contains the element returned by getStaticPaths
  const referenceId = params["reference-id"];

  // Pass post data to the page via props
  return { props: { referenceId } };
}

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
      <Head>{getPageTitle(elementDefinition.name)}</Head>
      <div className="flex pt-32">
        <ReferenceNavigation />
        <div className="px-5 sm:px-12 w-full">
          <main className="mx-auto px-4 center-column">
            <Breadcrumb
              pageName={`${elementDefinition.name}`}
              parents={[
                { name: "Docs", path: "docs" },
                { name: "Reference", path: "reference" },
                { name: "Elements", path: "elements" },
              ]}
            />
            <h1 className="text-4xl font-semibold mb-4">&lt;{elementDefinition.name}&gt;</h1>
            {elementDefinition.description &&
              elementDefinition.description.map((descriptionText, index) => (
                <MarkDownDocs className="my-6 text-base" key={index}>
                  {descriptionText}
                </MarkDownDocs>
              ))}
            {primaryExample && (
              <>
                <AnchorLink anchorId={`try`} title={"Try It"} verticalOffset>
                  <h2 className="my-6 scroll-m-20 text-3xl font-medium inline-block" id="try it">
                    Try it
                  </h2>
                </AnchorLink>
                <ExampleView
                  description={primaryExample.description}
                  key={`${referenceId}-primary`}
                  baseScene={
                    primaryExample.baseSceneOn !== undefined ? primaryExample.baseSceneOn : true
                  }
                  code={primaryExample.code}
                  initialClients={primaryExample.clients ?? [CLIENT_TYPES.FLOATING]}
                  containerHeight={480}
                />
              </>
            )}
            {!!attributes.length && (
              <>
                <AnchorLink anchorId={`attributes`} title={"Attributes"} verticalOffset>
                  <h2 className="mt-12 scroll-m-20 text-3xl font-medium inline-block">
                    Attributes
                  </h2>
                </AnchorLink>
                <code className="bg-gray-200 text-red-800 font-mono">
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
            {!!attributeGroups.length && (
              <>
                <AnchorLink anchorId={`attribute-groups`} title={"Attribute Groups"} verticalOffset>
                  <h2 className="mt-12 scroll-m-20 text-3xl font-medium inline-block">
                    Attribute Groups
                  </h2>
                </AnchorLink>
                <ul className="bg-gray-200 text-red-800 rounded p-1 font-mono">
                  {attributeGroups.map((attributeGroup) => (
                    <li key={attributeGroup}>
                      <AttributeGroup attributeGroupName={attributeGroup} />
                    </li>
                  ))}
                </ul>
              </>
            )}
            {filteredExamples.length > 0 && (
              <>
                <AnchorLink anchorId={`examples`} title={"Examples"} verticalOffset>
                  <h2 className="mt-12 scroll-m-20 text-3xl font-medium inline-block">Examples</h2>
                </AnchorLink>
                {filteredExamples.map((exampleKey) => {
                  const example = examplesForElement.examples[exampleKey];
                  return (
                    <div key={`${referenceId}-${example.title}`}>
                      <AnchorLink
                        anchorId={`example-${exampleKey}`}
                        title={`Example ${exampleKey}`}
                        verticalOffset
                      >
                        <h3 className="mt-8 text-[24px] font-medium inline-block">
                          {example.title}
                        </h3>
                      </AnchorLink>
                      <MarkDownDocs>{`${example.description}`}</MarkDownDocs>
                      <ExampleView
                        description={example.title}
                        baseScene={example.baseSceneOn !== undefined ? example.baseSceneOn : true}
                        code={example.code}
                        initialClients={example.clients ?? [CLIENT_TYPES.FLOATING]}
                        containerHeight={480}
                        containerStyle="mt-4"
                      />
                    </div>
                  );
                })}
              </>
            )}
            <AnchorLink anchorId={`compatibility`} title={"Compatibility"} verticalOffset>
              <h2 className="mt-12 scroll-m-20 text-3xl font-medium inline-block">
                Compatibility Table
              </h2>
            </AnchorLink>
            <CompatibilityTable element={elementDefinition.name} />
          </main>
        </div>
        <LinkList
          elementList={[
            "Try it",
            attributes.length ? "Attributes" : "",
            "Attribute groups",
            "Examples",
            "Compatibility",
          ]}
        />
      </div>
    </>
  );
};

export default DocsPage;
