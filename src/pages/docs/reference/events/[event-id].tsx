import { EventsClassSchemaType, eventsSchemaJSON, EventType } from "@mml-io/mml-schema";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import { ReferenceType, ReflectionType } from "typedoc";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import LinkList from "@/src/components/Common/LinkList";
import Navigation from "@/src/components/Common/Navigation";

// This function gets called at build time to generate all the files
export function getStaticPaths() {
  // Call an external API endpoint to get posts
  const elements = eventsSchemaJSON.children.map((element) => element.name);

  // Get the paths we want to pre-render based on elements
  const paths = elements.map((element) => ({
    params: { "event-id": element },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export function getStaticProps({ params }) {
  // params contains the element returned by getStaticPaths
  const eventId = params["event-id"];

  // Pass post data to the page via props
  return { props: { eventId } };
}

function isReference(type: { type: string }): type is ReferenceType {
  return type.type === "reference";
}

function getEventClass(name: string) {
  return eventsSchemaJSON.children.find((eventClass) => eventClass.name === name);
}

const DocsPage = ({ eventId }: { eventId: string }) => {
  const eventClassDefinition: EventsClassSchemaType = getEventClass(eventId);

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

  const createTypeLink = (type: string) => {
    if (getEventClass(type)) {
      return (
        <Link className="text-xl text-primary" href={`/docs/reference/events/${type}`}>
          {type}
        </Link>
      );
    }

    return type;
  };

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
      <Head>
        <title>{eventClassDefinition.name} - MML</title>
      </Head>
      <div className="mx-auto max-w-[450px] sm:max-w-[575px] sm:px-0 md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1300px]">
        <div className="flex w-full">
          <Navigation />
          <main className="w-full flex-1 p-4 sm:px-0 lg:flex-[1_0_766px]">
            <h1 className="mb-8 text-[40px] font-semibold uppercase">
              {eventClassDefinition.name}
              {extendedTypes.length > 0 && (
                <span className="text-sm"> extends {extendedTypes.map(createTypeLink)}</span>
              )}
            </h1>
            {eventClassDefinition.comment && (
              <TypeDocComment comment={eventClassDefinition.comment} />
            )}
            <h2 className="mb-4 mt-8 text-[32px] font-medium" id="properties">
              Properties
            </h2>
            {eventClassDefinition.children
              .filter((property) => {
                if (!showExternalProperties && property.flags.isExternal) {
                  return false;
                }
                if (!showInheritedProperties && property.inheritedFrom) {
                  return false;
                }
                return true;
              })
              .map((property) => (
                <div key={property.name}>
                  <h3 className="mb-2 flex items-center text-lg">
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
                      <ReactMarkdown key={index}>{descriptionText.text}</ReactMarkdown>
                    ))}
                  <TypeDocType name={property.name} type={property.type as EventType} />
                </div>
              ))}
            {eventClassDefinition.extendedBy && (
              <>
                <h2 className="mb-4 text-xl uppercase">Subclasses</h2>
                {eventClassDefinition.extendedBy.map((eventClass) => (
                  <div key={eventClass.name}>
                    <h3 className="mb-2 text-lg uppercase">{eventClass.name}</h3>
                  </div>
                ))}
              </>
            )}
          </main>
          <LinkList elementList={["properties"]} />
        </div>
      </div>
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
              <>
                <span className="text-primary">{`${index ? "\n         " : ""}${
                  type.declaration.children[0].name
                }`}</span>
                {`: ${type.declaration.children[0].type.name}`}
              </>
            ))}
            {"\n}"}
          </span>
        </div>
        <div className="mt-4">
          <h2 className="mb-2 text-lg font-medium">Type declaration</h2>
          {type.types.map((type: any) => {
            const dec = type.declaration.children[0];
            return (
              <>
                <ul className="mb-4 ml-12 flex ">
                  <li className="list-disc text-primary">{dec.name}: &nbsp;</li>
                  <TypeDocType type={dec.type} />
                </ul>
                <div className="mb-4 ml-8">
                  {dec.comment && <TypeDocComment comment={dec.comment} />}
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
  } else if (type.type === "union") {
    return (
      <div>
        <h2>Union</h2>
        <ul>
          {type.types.map((type) => {
            return (
              <li className={"mb-4 ml-3"}>
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
        <ul>
          {type.declaration.children.map((dec) => {
            return (
              <li className={"mb-4"}>
                <div className="flex border-[1px] border-editor-border-dark p-4">
                  <h3 className="text-primary">{dec.name}: &nbsp;</h3>
                  <TypeDocType type={dec.type} />
                </div>
                <div className="mt-4">
                  <h2 className="mb-2 text-lg font-medium">Type declaration</h2>
                  <ul className="mb-4 ml-12 flex ">
                    <li className="list-disc text-primary">{dec.name}: &nbsp;</li>
                    <TypeDocType type={dec.type} />
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
      </div>
    );
  } else if (type.type === "intrinsic") {
    return <div>{type.name}</div>;
  } else if (type.type === "literal") {
    return <div>Literal: {type.value.toString()}</div>;
  }
  return <div>Unknown type</div>;
}

function TypeDocComment(props: { comment: { summary: { text: string }[] } }) {
  return (
    <>
      {props.comment.summary.map((descriptionText, index) => (
        <ReactMarkdown key={index}>{descriptionText.text}</ReactMarkdown>
      ))}
    </>
  );
}

export default DocsPage;
