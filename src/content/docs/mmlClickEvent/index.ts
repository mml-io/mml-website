import { CLIENT_TYPES, DocsExamples } from "@/types/docs-reference";

import clickedBy from "./clicked-by.mml";
import position from "./position.mml";
import primary from "./primary.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic click event",
    description: "This is a basic click event.",
    code: primary,
  },
  clickedBy: {
    title: "Clicked by",
    description: "This example shows which client clicked the cube.",
    code: clickedBy,
    clients: [CLIENT_TYPES.FLOATING, CLIENT_TYPES.FLOATING],
  },
  position: {
    title: "Position",
    description: "This example shows the position of the click event.",
    code: position,
  },
};
