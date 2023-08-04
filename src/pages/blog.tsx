import Head from "next/head";
import Link from "next/link";
import * as React from "react";

import { posts } from "@/src/content/blogPosts";
import { getPageTitle } from "@/src/util";
const DocsPage = () => {
  return (
    <>
      <Head>{getPageTitle("Blog")}</Head>
      <main className="mx-auto mt-32 max-w-[450px] px-4 sm:max-w-[575px] sm:px-0 md:max-w-[768px] lg:max-w-[992px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1300px]">
        <h1 className="text-4xl font-semibold">Blog</h1>
        <div className="flex flex-wrap justify-center xl:justify-between">
          {Object.entries(posts).map(([key, { title, description, image }]) => (
            <Link key={key} href={`/blog/${key}`} className="xl:max-w-[49%]">
              <div className="mt-9 w-full flex-1 border-[1px] border-editor-border dark:border-editor-border-dark">
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
