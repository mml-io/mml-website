import { DocsExamples } from "@/types/docs-reference";

import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import scale from "./scale.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic M-Group",
    description: "This is a basic M-Group.",
    code: primary,
  },
  "position-example": {
    title: "M-Group Position",
    description: "This is a basic M-Group with position properties.",
    code: position,
  },
  "rotation-example": {
    title: "M-Group Rotation",
    description: "This is a basic M-Group with rotation properties.",
    code: rotation,
  },
  "scale-example": {
    title: "M-Group Scale",
    description: "This is a basic M-Group with scale properties.",
    code: scale,
  },
};
