import { DocsExamples } from "@/types/docs-reference";

import primary from "./primary.mml";
import transformed from "./transformed.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-frame",
    description: "This is a basic m-frame that references a static mml file.",
    code: primary,
  },
  transformed: {
    title: "Transformed m-frame",
    description: "This example shows how m-frames can transform the document that they reference",
    code: transformed,
  },
};
