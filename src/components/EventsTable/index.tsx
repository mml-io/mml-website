import { eventsSchemaJSON } from "@mml-io/mml-schema";
import * as React from "react";

import { DocsRow, DocsTableContainer } from "@/src/components/DocsTable";

const EventsTable = () => {
  return (
    <DocsTableContainer
      title="Events"
      description="All of the MML Event types and their properties."
      type="Events"
      className="mt-8"
    >
      {eventsSchemaJSON.children.map((eventClass) => (
        <DocsRow
          key={eventClass.name}
          description={eventClass.name}
          name={eventClass.name}
          link={`/docs/reference/events/${eventClass.name}`}
        />
      ))}
    </DocsTableContainer>
  );
};

export default EventsTable;
