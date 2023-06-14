import Head from "next/head";
import * as React from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import { DocsElement, DocsListContainer } from "@/src/components/DocsList";
import { guides } from "@/src/content/guides";

const DocsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Guides" parents={[{ name: "Docs", path: "docs" }]} />
      <Head>
        <title>Guide - MML</title>
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
      </main>
    </>
  );
};

export default DocsPage;
