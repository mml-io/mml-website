import * as React from "react";

import { DocsRow, DocsTableContainer } from "@/src/components/DocsTable";
import { eventClasses } from "@/src/util/event-classes";

const EventsTable = () => {
  return (
    <DocsTableContainer
      title="Events"
      description="All of the MML Event types and their properties."
      type="Events"
      className="mt-8"
    >
      {eventClasses.map((eventClass) => (
        <DocsRow
          key={eventClass.name}
          description={eventClass.comment}
          name={eventClass.name}
          link={`/docs/reference/events/${eventClass.name}`}
        />
      ))}
    </DocsTableContainer>
  );
};

export default EventsTable;
