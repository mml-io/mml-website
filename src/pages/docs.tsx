import Head from "next/head";
import * as React from "react";

import ElementsTable from "@/src/components/ElementsTable";
import EventsTable from "@/src/components/EventsTable";

const DocsPage = () => {
  return (
    <>
      <Head>
        <title>Docs - MML</title>
      </Head>
      <main className="mx-auto mt-32 max-w-[450px] px-4 sm:max-w-[575px] sm:px-0 md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1300px]">
        <ElementsTable />
        <EventsTable />
      </main>
    </>
  );
};

export default DocsPage;
