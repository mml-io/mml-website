import { DocsExamples } from "@/types/docs-reference";

import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import scale from "./scale.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-group",
    description: "This is a basic m-group.",
    code: primary,
  },
  "position-example": {
    title: "Position",
    description: "This is a basic m-group with position properties.",
    code: position,
  },
  "rotation-example": {
    title: "Rotation",
    description: "This is a basic m-group with rotation properties.",
    code: rotation,
  },
  "scale-example": {
    title: "Scale",
    description: "This is a basic m-group with scale properties.",
    code: scale,
  },
};
