import { DocsExamples } from "@/types/docs-reference";

import primary from "./primary.mml";
import advanced from "./speed.mml";
import weightBlending from "./weight-blending.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-animation",
    description: "This is a basic m-animation used as a child of m-character.",
    code: primary,
  },
  "weight-blending": {
    title: "Weight Blending Example",
    description:
      "This example shows multiple animations with weight blending and lerping between weights.",
    code: weightBlending,
  },
  advanced: {
    title: "Speed",
    description: "This example demonstrates the speed attribute of m-animation.",
    code: advanced,
  },
};
