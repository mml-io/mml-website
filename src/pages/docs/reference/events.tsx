import * as React from "react";

import EventsTable from "@/src/components/EventsTable";

const DocsPage = () => {
  return (
    <>
      <main className="mx-auto mt-32 px-4 sm:max-w-[575px] md:max-w-[768px] lg:max-w-[1281px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1300px]">
        <EventsTable />
      </main>
    </>
  );
};

export default DocsPage;
