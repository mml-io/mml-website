import { createSchemaDefinition, schemaJSON } from "@mml-io/mml-schema";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import { eventClasses } from "@/src/util/event-classes";

const schemaDefinition = createSchemaDefinition(schemaJSON);

export default function ReferenceNavigation() {
  const route = useRouter();
  const referenceId = route.query["reference-id"] as string;
  const eventId = route.query["event-id"] as string;

  const selectedStyle =
    "bg-body-color bg-opacity-30 text-black dark:text-white pl-4 rounded-br rounded-tr";

  return (
    <div className="basis-80 flex-grow-0 flex-shrink-0 w-full hidden 2xl:block 2xl:relative">
      <nav className="lg:overflow-y-scroll w-80 fixed bottom-0 top-32 pb-10">
        <p className="font-semibold pl-5 mb-2">MML Elements</p>
        <ul>
          {Object.values(schemaDefinition.elements)
            .filter((element) => element.name.startsWith("m-"))
            .map((element) => {
              const isSelected = element.name === referenceId;

              return (
                <li
                  key={element.name}
                  className={`flex h-11 w-full items-center text-sm pl-7 ${
                    isSelected && selectedStyle
                  }`}
                >
                  <Link
                    href={`/docs/reference/elements/${element.name}`}
                  >{`<${element.name}>`}</Link>
                </li>
              );
            })}

          <p className="pl-5 mt-8 mb-2 font-semibold">Events</p>

          {eventClasses.map((element) => {
            const isSelected = element.name === eventId;

            return (
              <li
                key={element.name}
                className={`flex h-11 w-full items-center text-sm pl-7 ${
                  isSelected && selectedStyle
                }`}
              >
                <Link href={`/docs/reference/events/${element.name}`}>{element.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
