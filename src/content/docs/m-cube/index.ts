import { DocsExamples } from "@/types/docs-reference";

import clickable from "./clickable.mml";
import dimensions from "./dimensions.mml";
import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import scale from "./scale.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic M-Cube",
    description: "This is a basic M-Cube.",
    code: primary,
  },
  "click-example": {
    title: "Clickable M-Cube",
    description: "Click the cube to change its color.",
    code: clickable,
  },
  "dimensions-example": {
    title: "M-Cube Dimension",
    description: "This is a basic M-Cube with dimension properties.",
    code: dimensions,
  },
  "position-example": {
    title: "M-Cube position",
    description: "This is a basic M-Cube with positions properties.",
    code: position,
  },
  "rotation-example": {
    title: "M-Cube Rotation",
    description: "This is a basic M-Cube with rotation properties.",
    code: rotation,
  },
  "scale-example": {
    title: "M-Cube Scale",
    description: "This is a basic M-Cube with scale properties.",
    code: scale,
  },
};
