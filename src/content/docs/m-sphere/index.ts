import { DocsExamples } from "@/types/docs-reference";

import clickable from "./clickable.mml";
import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import scale from "./scale.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic M-Audio",
    description: "This is a basic M-Audio.",
    code: primary,
  },
  "click-example": {
    title: "Clickable M-Sphere",
    description: "Click the cube to change its color.",
    code: clickable,
  },
  "scale-example": {
    title: "M-Sphere Scale",
    description: "This is a basic M-Sphere with scale properties.",
    code: scale,
  },
  "position-example": {
    title: "M-Sphere Transform",
    description: "This is a basic M-Sphere with position properties.",
    code: position,
  },
  "rotation-example": {
    title: "M-Sphere Rotation",
    description: "This is a basic M-Sphere with rotation properties.",
    code: rotation,
  },
};
