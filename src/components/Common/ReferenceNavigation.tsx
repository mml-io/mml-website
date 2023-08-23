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
    "bg-[#0581DC19] border-l-[#0581DC] border-l-2 text-black dark:text-white pl-4";

  return (
    <nav className="fixed left-10 hidden xl:top-[220px] xl:block xl:h-[calc(100%-270px)] xl:w-[170px] xl:overflow-x-visible xl:overflow-y-scroll">
      <p className="font-semibold">MML Elements</p>
      <ul>
        {Object.values(schemaDefinition.elements)
          .filter((element) => element.name.startsWith("m-"))
          .map((element) => {
            const isSelected = element.name === referenceId;

            return (
              <li
                key={element.name}
                className={`flex h-[36px] w-full items-center text-sm ${
                  isSelected && selectedStyle
                }`}
              >
                <Link href={`/docs/reference/elements/${element.name}`}>{`<${element.name}>`}</Link>
              </li>
            );
          })}
        <p className="mt-8 font-semibold">Events</p>

        {eventClasses.map((element) => {
          const isSelected = element.name === eventId;

          return (
            <li
              key={element.name}
              className={`flex h-[36px] w-full items-center text-sm ${isSelected && selectedStyle}`}
            >
              <Link href={`/docs/reference/events/${element.name}`}>{element.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
