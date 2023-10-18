import { eventsSchemaJSON } from "@mml-io/mml-schema";

export const eventClasses = (eventsSchemaJSON.children || []).filter((child) =>
  child.name.endsWith("Event"),
);
