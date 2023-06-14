import Head from "next/head";
import * as React from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import { DocsElement, DocsListContainer } from "@/src/components/DocsList";
import ElementsTable from "@/src/components/ElementsTable";
import EventsTable from "@/src/components/EventsTable";
import { guides } from "@/src/content/guides";

const DocsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Docs" />
      <Head>
        <title>Docs - MML</title>
      </Head>
      <main className="mx-auto max-w-screen-xl px-5 xl:p-0">
        <DocsListContainer
          title="Guides"
          description="Guides to help you get started with MML"
          className="mt-8"
        >
          {Object.entries(guides).map(([key, { title, description }]) => (
            <DocsElement
              key={key}
              description={description}
              name={`${title}`}
              link={`/docs/guides/${key}`}
            />
          ))}
        </DocsListContainer>
        <ElementsTable />
        <EventsTable />
      </main>
    </>
  );
};

export default DocsPage;
