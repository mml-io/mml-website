/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import * as React from "react";

import { posts } from "@/src/content/blogPosts";
import { getPageTitle } from "@/src/util";

export function getStaticPaths() {
  const elements = Object.keys(posts).map((element) => element);

  // Get the paths we want to pre-render based on elements
  const paths = elements.map((element) => ({
    params: { "post-id": element },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export function getStaticProps({ params }: { params: { "post-id": string } }) {
  // params contains the element returned by getStaticPaths
  const postId = params["post-id"];

  // Pass post data to the page via props
  return { props: { postId } };
}

const GuidePage = ({ postId }: { postId: string }) => {
  const title = posts[postId].title;
  const Body = posts[postId].body;
  const image = posts[postId].image;

  return (
    <>
      <Head>{getPageTitle(title)}</Head>
      <div className="mt-32">
        <div className="flex justify-center">
          <div className="mx-4 w-full center-column flex-1">
            <Link href="/blog/" className="mb-6 flex items-center">
              <img
                src="/images/blog/backArrow.svg"
                alt="back"
                className="mr-[10px] brightness-0 filter dark:invert"
              />
              <span>Back</span>
            </Link>
            <img src={image} alt={title} className="w-full" width="1024" height="530" />
            <div className="mt-4 mdx">
              <Body />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidePage;
