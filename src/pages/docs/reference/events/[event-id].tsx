import { EventsClassSchemaType, eventsSchemaJSON, EventType } from "@mml-io/mml-schema";
import Head from "next/head";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import { ReferenceType, ReflectionType } from "typedoc";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import LinkList from "@/src/components/Common/LinkList";
import Navigation from "@/src/components/Common/Navigation";

// This function gets called at build time to generate all the files
export function getStaticPaths() {
  // Call an external API endpoint to get posts

  // Filter the element to only those that start with "m-" for now
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

const DocsPage = ({ eventId }: { eventId: string }) => {
  const eventClassDefinition: EventsClassSchemaType = eventsSchemaJSON.children.find(
    (eventClass) => {
      return eventClass.name === eventId;
    },
  );

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
      <div className="flex w-full">
        <div className="flex w-full justify-center">
          <Navigation />
          <main className="w-full flex-1 p-5 lg:flex-[0_0_766px] xl:mx-[33px]">
            <h1 className="mb-4 text-2xl uppercase">{eventClassDefinition.name}</h1>
            {extendedTypes.length > 0 && (
              <div className="mb-4">
                <h2 className="mb-2 text-xl uppercase">Extends</h2>
                <h2>{extendedTypes.join(", ")}</h2>
              </div>
            )}
            {eventClassDefinition.comment && (
              <TypeDocComment comment={eventClassDefinition.comment} />
            )}
            <h2 className="mb-4 text-xl uppercase">Properties</h2>
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
                <div key={property.name} style={{ border: "1px solid black" }}>
                  <h3 className="mb-2 text-lg uppercase">Property name: {property.name}</h3>
                  {property.comment &&
                    property.comment.summary.map((descriptionText, index) => (
                      <ReactMarkdown key={index}>{descriptionText.text}</ReactMarkdown>
                    ))}
                  <h2 className="mb-4 text-xl uppercase">Property Flags</h2>
                  {Object.entries(property.flags).map(([flag]) => {
                    return (
                      <div key={flag}>
                        <h3 className="mb-2 text-lg uppercase">{flag}</h3>
                      </div>
                    );
                  })}
                  <h2 className="mb-4 text-xl uppercase">Property Type</h2>
                  <TypeDocType type={property.type as EventType} />
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
          <LinkList />
        </div>
      </div>
    </>
  );
};

function TypeDocType(props: { type: EventType | ReflectionType | ReferenceType }) {
  const { type } = props;
  if (type.type === "intersection") {
    return (
      <div>
        <h2>Intersection</h2>
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
        <h2>Reflection</h2>
        <ul>
          {type.declaration.children.map((dec) => {
            return (
              <li className={"mb-4 ml-3"}>
                <h2>{dec.name}</h2>
                <>{dec.comment && <TypeDocComment comment={dec.comment} />}</>
                <>
                  <TypeDocType type={dec.type} />
                </>
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
