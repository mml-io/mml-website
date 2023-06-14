import Head from "next/head";
import * as React from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import { posts } from "@/src/content/blogPosts";

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
export function getStaticProps({ params }) {
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
      <Breadcrumb pageName={`${postId}`} parents={[{ name: "Blog", path: "blog" }]} />
      <Head>
        <title>{title} - MML</title>
      </Head>
      <div className="container">
        <div className="flex justify-center">
          <div className="w-full max-w-[800px] flex-1">
            <img src={image} alt={title} className="w-full" width="1024" height="530" />
            <div className="mt-4">
              <Body />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidePage;
