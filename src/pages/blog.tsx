import Head from "next/head";
import Link from "next/link";
import * as React from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import { posts } from "@/src/content/blogPosts";
const DocsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Docs" />
      <Head>
        <title>Blog - MML</title>
      </Head>
      <main className="mx-5 max-w-[1280px] xl:mx-auto">
        <h1 className="text-4xl font-semibold">Blog</h1>
        <div className="flex flex-wrap justify-center xl:justify-between">
          {Object.entries(posts).map(([key, { title, description, image }]) => (
            <Link key={key} is="div" href={`/blog/${key}`}>
              <div className="mt-9 w-full flex-1 border-[1px] border-editor-border dark:border-editor-border-dark xl:max-w-[620px]">
                <img className="w-full" src={image} alt={title} width={620} height={321} />
                <div className="p-8 dark:bg-editor-bg">
                  <p className="text-2xl font-medium">{title}</p>
                  <p className="mt-4">{description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default DocsPage;
