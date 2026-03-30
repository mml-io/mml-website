/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import * as React from "react";

import LinkList from "@/src/components/Common/LinkList";
import PageMeta from "@/src/components/PageMeta";
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
export function getStaticProps({ params }: { params: { "post-id": string } }) {
  // params contains the element returned by getStaticPaths
  const postId = params["post-id"];

  // Pass post data to the page via props
  return { props: { postId } };
}

const BlogPostPage = ({ postId }: { postId: string }) => {
  const { title, description, body: Body, image, date, linkList } = posts[postId];
  const hasLinks = linkList && linkList?.length;

  return (
    <>
      <PageMeta
        title={title}
        description={description}
        path={`/blog/${postId}`}
        type="article"
        image={image}
        publishedDate={date}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description,
          datePublished: date,
          dateModified: date,
          image: `https://mml.io${image}`,
          url: `https://mml.io/blog/${postId}`,
          author: { "@type": "Organization", name: "MML" },
          publisher: { "@type": "Organization", name: "MML", url: "https://mml.io" },
        }}
      />
      <div className="mt-32">
        <div className="flex justify-center">
          {hasLinks && <div className="top-32"></div>}
          <article className="mx-4 w-full center-column flex-1">
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
          </article>
          {hasLinks && (
            <div className="top-32">
              <LinkList elementList={linkList} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
