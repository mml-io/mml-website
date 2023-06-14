import Head from "next/head";
import * as React from "react";

import { DocsElement, DocsListContainer } from "@/src/components/DocsList";
import ElementsTable from "@/src/components/ElementsTable";
import EventsTable from "@/src/components/EventsTable";
import { guides } from "@/src/content/guides";

const DocsPage = () => {
  return (
    <>
      <Head>
        <title>Docs - MML</title>
      </Head>
      <main className="mx-auto mt-32 px-4 sm:max-w-[575px] md:max-w-[768px] lg:max-w-[1281px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1300px]">
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
