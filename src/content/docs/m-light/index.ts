import { DocsExamples } from "@/types/docs-reference";

import point from "./point.mml";
import primary from "./primary.mml";
import spotlight from "./spotlight.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-light",
    description: "This is a basic m-light.",
    code: primary,
    baseSceneOn: false,
  },
  "spotlight-light-example": {
    title: "Spotlight",
    description: "This is a spotlight m-light example.",
    code: spotlight,
    baseSceneOn: false,
  },
  "point-light-example": {
    title: "Point",
    description: "This is a point m-light example.",
    code: point,
    baseSceneOn: false,
  },
};
