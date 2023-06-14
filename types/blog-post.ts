import { DocsGuide } from "@/types/docs-guides";

export type BlogPost = DocsGuide & {
  image: string;
};

export type BlogPostsByName = {
  [key: string]: BlogPost;
};
