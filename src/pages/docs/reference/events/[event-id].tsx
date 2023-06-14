import { EventsClassSchemaType, eventsSchemaJSON, EventType } from "@mml-io/mml-schema";

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












              </div>
































                </div>
              ))}













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
