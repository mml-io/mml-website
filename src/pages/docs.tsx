import Head from "next/head";
import * as React from "react";

import ElementsTable from "@/src/components/ElementsTable";
import EventsTable from "@/src/components/EventsTable";
import GuidesList from "@/src/components/GuidesList";
import { getPageTitle } from "@/src/util";

const DocsPage = () => {
  return (
    <>
      <Head>{getPageTitle("Docs")}</Head>
      <main className="mx-auto mt-32 max-w-[450px] px-4 sm:max-w-[575px] sm:px-0 md:max-w-[768px] lg:max-w-[800px]">
        <GuidesList />
        <ElementsTable />
        <EventsTable />
      </main>
    </>
  );
};

export default DocsPage;
