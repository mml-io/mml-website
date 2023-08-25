import { MDXProps } from "mdx/types";
import { ReactElement } from "react";

export type DocsGuide = {
  title: string;
  description: string;
  body: (props: MDXProps) => ReactElement;
  linkList: Array<string>;
};

export type DocsGuidesByName = {
  [key: string]: DocsGuide;
};
