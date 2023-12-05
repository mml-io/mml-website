import Head from "next/head";
import * as React from "react";

import ElementsTable from "@/src/components/ElementsTable";
import EventsTable from "@/src/components/EventsTable";
import { getPageTitle } from "@/src/util";

const DocsPage = () => {
  return (
    <>
      <Head>{getPageTitle("Docs - Reference")}</Head>
      <main className="mx-auto w-full px-8 lg:px-12 max-w-centerColumn mt-32">
        <ElementsTable />
        <EventsTable />
      </main>
    </>
  );
};

export default DocsPage;
