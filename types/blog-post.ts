import { MDXProps } from "mdx/types";

export type BlogPost = {
  title: string;
  description: string;
  date: string;
  body: (props: MDXProps) => JSX.Element;
  image: string;
  linkList?: string[];
};

export type BlogPostsByName = {
  [key: string]: BlogPost;
};
