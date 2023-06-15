import { MDXProps } from "mdx/types";

export type BlogPost = {
  title: string;
  description: string;
  body: (props: MDXProps) => JSX.Element;
  image: string;
};

export type BlogPostsByName = {
  [key: string]: BlogPost;
};
