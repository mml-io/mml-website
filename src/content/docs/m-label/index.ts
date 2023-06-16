import { DocsExamples } from "@/types/docs-reference";

import dimension from "./dimension.mml";
import fontColor from "./font-color.mml";
import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-label",
    description: "This is a basic m-label example.",
    code: primary,
  },
  "color-example": {
    title: "Font Color",
    description: "This is an m-label example with color properties.",
    code: fontColor,
  },
  "dimension-example": {
    title: "Dimensions",
    description: "This is an m-label example with dimension properties.",
    code: dimension,
  },
  "position-example": {
    title: "Position",
    description: "This is an m-label example with position properties.",
    code: position,
  },
  "rotation-example": {
    title: "Rotation",
    description: "This is an m-label example with rotation properties.",
    code: rotation,
  },
};
