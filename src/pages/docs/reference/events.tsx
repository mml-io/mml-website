import * as React from "react";

import EventsTable from "@/src/components/EventsTable";

const DocsPage = () => {
  return (
    <>
      <main className="mx-auto w-full px-8 lg:px-12 max-w-centerColumn mt-32">
        <EventsTable />
      </main>
    </>
  );
};

export default DocsPage;
