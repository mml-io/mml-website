import { MDXProps } from "mdx/types";

export type DocsGuide = {
  title: string;
  description: string;
  body: (props: MDXProps) => JSX.Element;
};

export type DocsGuidesByName = {
  [key: string]: DocsGuide;
};
