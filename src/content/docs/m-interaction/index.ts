import { DocsExamples } from "@/types/docs-reference";

import multiple from "./multiple.mml";
import primary from "./primary.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-interaction",
    description: "This is a basic m-interaction.",
    code: primary,
  },
  multiple: {
    title: "Multiple m-interactions",
    description:
      "Multiple m-interactions can be present at once. The menu presents the available interactions. In this example the positions of the `m-interaction` elements differ to allow moving into range of multiple of the interactions or just a subset.",
    code: multiple,
  },
};
