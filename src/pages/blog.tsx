import Head from "next/head";
import Link from "next/link";
import * as React from "react";

import { posts } from "@/src/content/blogPosts";
import { getPageTitle } from "@/src/util";

type BlogPostProps = {
  postId: string;
  image: string;
  title: string;
  subtitle: string;
  date: string;
};

const BlogPost = ({ postId, image, title, subtitle, date }: BlogPostProps) => {
  const link = `/blog/${postId}`;
  return (
    <Link href={link} className="shadow-xl rounded-sm p-4 mb-6 flex flex-col md:flex-row bg-[radial-gradient(50%_100%_at_75%_75%,_rgb(189_189_189_/_40%)_0%,_rgba(0,_0,_0,_0.10)_150%)] dark:bg-[radial-gradient(50%_100%_at_75%_75%,_rgb(130_130_130_/_40%)_0%,_rgba(0,_0,_0,_0.10)_150%)]">
      <img
        src={image}
        alt={title}
        className="w-full md:w-48 h-32 md:h-auto object-cover rounded-md flex-shrink-0 mb-4 md:mb-0 md:mr-4"
      />
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
        <p className="text-gray-400 text-xs mt-1">{date}</p>
        <a href={link} className="text-blue-500 hover:underline mt-2 inline-block">
          Read more
        </a>
      </div>
    </Link>
  );
};

const BlogPage = () => {
  return (
    <>
      <Head>{getPageTitle("Blog")}</Head>
      <main className="mx-auto mt-32 center-column">
        <h1 className="text-4xl">Blog</h1>
        <div className="container mx-auto px-4 py-8">
          {Object.entries(posts).map(([key, { title, description, image, date }]) => (
            <BlogPost
              key={key}
              postId={key}
              image={image}
              title={title}
              subtitle={description}
              date={date}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default BlogPage;
