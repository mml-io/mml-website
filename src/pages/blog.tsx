import Link from "next/link";
import * as React from "react";

import PageMeta from "@/src/components/PageMeta";
import { posts } from "@/src/content/blogPosts";

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
    <article className="card card-hover overflow-hidden">
      <Link href={link} className="flex flex-col">
        <img src={image} alt={title} className="w-full aspect-video object-cover" />
        <div className="p-5">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-secondary dark:text-slate-400 text-sm mt-2 line-clamp-2">{subtitle}</p>
          <p className="text-secondary/60 dark:text-slate-500 text-xs mt-2">{date}</p>
          <span className="mt-4 inline-block btn-ghost">Read more</span>
        </div>
      </Link>
    </article>
  );
};

const BlogPage = () => {
  return (
    <>
      <PageMeta title="Blog" description="News and updates from the MML project." path="/blog" />
      <main className="container mt-32">
        <div className="mb-6 flex items-end justify-between">
          <h1 className="text-4xl font-semibold">Blog</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
