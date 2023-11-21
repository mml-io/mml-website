import { EventsClassSchemaType, EventType } from "@mml-io/mml-schema";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import { ReferenceType, ReflectionType } from "typedoc";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import LinkList from "@/src/components/Common/LinkList";
import ReferenceNavigation from "@/src/components/Common/ReferenceNavigation";
import ExampleView from "@/src/components/ExampleView/DocsExampleViewDynamic";
import TypeDocComment from "@/src/components/TypeDocComment";
import * as docsExamples from "@/src/content/docs";
import { getPageTitle } from "@/src/util";
import { eventClasses } from "@/src/util/event-classes";
import { CLIENT_TYPES } from "@/types/docs-reference";

// This function gets called at build time to generate all the files
export function getStaticPaths() {
  // Call an external API endpoint to get posts
  const elements = eventClasses.map((element) => element.name);

  // Get the paths we want to pre-render based on elements
  const paths = elements.map((element) => ({
    params: { "event-id": element },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export function getStaticProps({ params }: { params: { "event-id": string } }) {
  // params contains the element returned by getStaticPaths
  const eventId = params["event-id"];

  // Pass post data to the page via props
  return { props: { eventId } };
}

function isReference(type: { type: string }): type is ReferenceType {
  return type.type === "reference";
}

function getEventClass(name: string) {
  return eventClasses.find((eventClass) => eventClass.name === name);
}

const DocsPage = ({ eventId }: { eventId: string }) => {
  const eventClassDefinition: EventsClassSchemaType = getEventClass(eventId)!;

  const showInheritedProperties = true;
  const showExternalProperties = false;

  const extendedTypes = [];
  if (eventClassDefinition.extendedTypes && eventClassDefinition.extendedTypes.length > 0) {
    for (const extendedType of eventClassDefinition.extendedTypes) {
      if (isReference(extendedType)) {
        extendedTypes.push(extendedType.name);
      }
    }
  }

  let primaryExample = null;
  const examplesForElement = docsExamples.examples[eventId];
  if (examplesForElement && examplesForElement.examples.primary) {
    primaryExample = examplesForElement.examples.primary;
  }

  const createTypeLink = (type: string, index: number) => {
    if (getEventClass(type)) {
      return (
        <Link key={index} className="text-xl text-primary" href={`/docs/reference/events/${type}`}>
          {type}
        </Link>
      );
    }

    return type;
  };

  const filteredExamples = examplesForElement
    ? Object.keys(examplesForElement.examples).filter((key) => key !== "primary")
    : [];

  const linkList = ["properties"];
  if (filteredExamples.length > 0) {
    linkList.push("examples");
  }

  return (
    <>
      <Breadcrumb
        pageName={`${eventClassDefinition.name}`}
        parents={[
          { name: "Docs", path: "docs" },
          { name: "Reference", path: "reference" },
          { name: "Events", path: "events" },
        ]}
      />
      <Head>{getPageTitle(eventClassDefinition.name)}</Head>
      <main className="mx-auto w-full px-4 lg:max-w-[800px] xl:px-0">
        <div className="flex w-full">
          <ReferenceNavigation />
          <main className="w-full flex-1 px-4 sm:px-0 lg:mr-5 lg:flex-[1_0_766px]">
            <h1 className="mb-4 text-4xl font-semibold uppercase">
              {eventClassDefinition.name}
              {extendedTypes.length > 0 && (
                <span className="text-sm"> extends {extendedTypes.map(createTypeLink)}</span>
              )}
            </h1>
            {eventClassDefinition.comment && (
              <TypeDocComment comment={eventClassDefinition.comment} />
            )}
            {primaryExample && (
              <div>
                <h2 className="mb-4 mt-8 scroll-m-20 text-3xl font-medium" id="try it">
                  Try it
                </h2>
                <ExampleView
                  key={eventId + primaryExample.title}
                  description={primaryExample.description}
                  baseScene={
                    primaryExample.baseSceneOn !== undefined ? primaryExample.baseSceneOn : true
                  }
                  code={primaryExample.code}
                  initialClients={primaryExample.clients ?? [CLIENT_TYPES.FLOATING]}
                />
              </div>
            )}
            <h2 className="mb-4 mt-6 scroll-m-20 text-3xl font-medium" id="properties">
              Properties
            </h2>
            {eventClassDefinition.children &&
              eventClassDefinition.children
                .filter((property) => {
                  if (!showExternalProperties && property.flags.isExternal) {
                    return false;
                  }
                  return !(!showInheritedProperties && property.inheritedFrom);
                })
                .map((property) => (
                  <div key={property.name}>
                    <h3 className="mb-4 flex items-center pt-8 text-lg">
                      {property.name}
                      {Object.entries(property.flags).map(([flag]) => {
                        return (
                          <span
                            key={flag}
                            className="ml-2 inline-block rounded-3xl px-2 text-sm text-black dark:bg-white"
                          >
                            {flag}
                          </span>
                        );
                      })}
                    </h3>
                    {property.comment &&
                      property.comment.summary.map((descriptionText, index) => (
                        <ReactMarkdown key={index} className="font-mono">
                          {descriptionText.text}
                        </ReactMarkdown>
                      ))}
                    <TypeDocType name={property.name} type={property.type as EventType} />
                  </div>
                ))}
            {eventClassDefinition.extendedBy && (
              <>
                <h2 className="mb-4 mt-6 scroll-m-20 text-3xl font-medium">Subclasses</h2>
                {eventClassDefinition.extendedBy.map((eventClass) => (
                  <div key={eventClass.name}>
                    <h3 className="mb-2 text-xl uppercase">{eventClass.name}</h3>
                  </div>
                ))}
              </>
            )}
            {filteredExamples.length > 0 && (
              <>
                <h2 id="examples" className="mb-4 mt-6 scroll-m-20 text-3xl font-medium">
                  Examples
                </h2>
                {filteredExamples.map((exampleKey) => {
                  const example = examplesForElement.examples[exampleKey];
                  return (
                    <div key={`${eventId}-${example.title}`}>
                      <h3 className="mb-4 mt-8 text-[24px] font-medium">{example.title}</h3>
                      <ExampleView
                        description={example.description}
                        baseScene={example.baseSceneOn !== undefined ? example.baseSceneOn : true}
                        code={example.code}
                        initialClients={example.clients ?? [CLIENT_TYPES.FLOATING]}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </main>
          <LinkList elementList={linkList} />
        </div>
      </main>
    </>
  );
};

function TypeDocType(props: { type: EventType | ReflectionType | ReferenceType; name?: string }) {
  const { type, name } = props;

  if (type.type === "intersection") {
    return (
      <div>
        <div className="whitespace-pre border-[1px] border-editor-border-dark p-4">
          <span className="text-primary">{`${name}:  `}</span>
          {"{"}
          <span>
            {`\n         `}
            {type.types.map((type: any, index) => (
              <Fragment key={index}>
                <span className="text-primary">{`${index ? "\n         " : ""}${
                  type.declaration.children[0].name
                }`}</span>
                {`: ${
                  type.declaration.children[0].type?.declaration?.children
                    ? type.declaration.children[0].name.slice(0, 1).toUpperCase() +
                      type.declaration.children[0].name.slice(1)
                    : type.declaration.children[0].type.name
                }`}
              </Fragment>
            ))}
            {"\n}"}
          </span>
        </div>
        <div className="mt-4">
          <h2 className="mb-4 mt-6 scroll-m-20 text-3xl font-medium">Type declaration</h2>
          {type.types.map((type: any, index: number) => {
            const dec = type.declaration.children[0];

            return (
              <Fragment key={index}>
                <ul className="mb-4 ml-12 flex ">
                  <li className="list-disc text-primary">{dec.name}: &nbsp;</li>
                  <TypeDocType type={dec.type} />
                </ul>
                <div className="mb-4 ml-8">
                  {dec.comment && <TypeDocComment comment={dec.comment} />}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  } else if (type.type === "union") {
    return (
      <div>
        <h2 className="mb-4 mt-6 scroll-m-20 text-3xl font-medium">Union</h2>
        <ul>
          {type.types.map((type, index) => {
            return (
              <li className={"mb-4 ml-3"} key={index}>
                <TypeDocType type={type} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else if (type.type === "reflection") {
    return (
      <div>
        {type.declaration.children?.length === 1 ? (
          <ul>
            {type.declaration.children?.map((dec, index) => {
              return (
                <li className={"mb-4"} key={index}>
                  <div className="flex border-[1px] border-editor-border-dark p-4">
                    <h3 className="text-primary">{dec.name}: &nbsp;</h3>
                    <TypeDocType type={dec.type!} />
                  </div>
                  <div className="mt-4">
                    <h2 className="mb-4 mt-6 scroll-m-20 text-3xl font-medium">Type declaration</h2>
                    <ul className="mb-4 ml-12 flex ">
                      <li className="list-disc text-primary">{dec.name}: &nbsp;</li>
                      <TypeDocType type={dec.type!} />
                    </ul>
                    <div className="mb-4 ml-8">
                      {dec.comment && <TypeDocComment comment={dec.comment} />}
                    </div>
                  </div>
                  <></>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="whitespace-pre">
            {"{"}
            <span>
              {`\n         `}
              {type.declaration.children &&
                type.declaration.children.map((declaration: any, index) => (
                  <Fragment key={index}>
                    <span className="text-primary">{`${index ? "\n         " : ""}${
                      declaration.name
                    }`}</span>
                    {`: ${declaration.type.name}`}
                  </Fragment>
                ))}
              {"\n}"}
            </span>
          </div>
        )}
      </div>
    );
  } else if (type.type === "intrinsic") {
    return <div>{type.name}</div>;
  } else if (type.type === "literal") {
    return <div className="mt-4">Literal: {type.value!.toString()}</div>;
  } else if (type.type === "reference") {
    return <div>{type.name}</div>;
  }
  return <div>Unknown type</div>;
}

export default DocsPage;
