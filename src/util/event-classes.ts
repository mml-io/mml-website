import { eventsSchemaJSON, EventType } from "@mml-io/mml-schema";

/**
 * Subset of TypeDoc's serialized DeclarationReflection used by event reference pages.
 * Defined locally to avoid issues with TypeDoc's complex ModelToObject generics.
 */
export type EventClassSchema = {
  name: string;
  comment?: {
    summary: Array<{ kind: string; text: string }>;
  };
  flags: Record<string, boolean>;
  children?: Array<{
    name: string;
    flags: Record<string, boolean>;
    inheritedFrom?: unknown;
    comment?: {
      summary: Array<{ kind: string; text: string }>;
    };
    type: EventType;
  }>;
  extendedTypes?: Array<{ type: string; name: string }>;
  extendedBy?: Array<{ type: string; name: string }>;
};

export const eventClasses: EventClassSchema[] = (
  (eventsSchemaJSON as { children?: EventClassSchema[] }).children || []
).filter((child) => child.name.endsWith("Event"));
