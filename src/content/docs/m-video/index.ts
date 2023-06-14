import { DocsExamples } from "@/types/docs-reference";

import dimensions from "./dimensions.mml";
import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import scale from "./scale.mml";
import singleDimension from "./single-dimension.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic M-Video",
    description: "This is a basic M-Video.",
    code: primary,
  },
  "dimension-example": {
    title: "M-Video Dimensions",
    description: "This is a basic M-video with dimension properties.",
    code: dimensions,
  },
  "position-example": {
    title: "M-Video Position",
    description: "This is a basic M-video with position properties.",
    code: position,
  },
  "rotation-example": {
    title: "M-Video Rotation",
    description: "This is a basic M-video with rotation properties.",
    code: rotation,
  },
  "scale-example": {
    title: "M-Video Scale",
    description: "This is a basic M-video with scale properties.",
    code: scale,
  },
  "single-dimension-example": {
    title: "M-Video Single Dimension",
    description:
      "Specifying only one dimension will resize the element keeping the original aspect ratio.",
    code: singleDimension,
  },
};
