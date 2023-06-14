import { DocsExamples } from "@/types/docs-reference";

import dimensions from "./dimensions.mml";
import position from "./position.mml";
import primary from "./primary.mml";
import rotation from "./rotation.mml";
import scale from "./scale.mml";
import singleDimension from "./single-dimension.mml";

export const examples: DocsExamples = {
  primary: {
    title: "Basic m-video",
    description: "This is a basic m-video.",
    code: primary,
  },
  "dimension-example": {
    title: "Dimensions",
    description: "This is a basic m-video with dimension properties.",
    code: dimensions,
  },
  "position-example": {
    title: "Position",
    description: "This is a basic m-video with position properties.",
    code: position,
  },
  "rotation-example": {
    title: "Rotation",
    description: "This is a basic m-video with rotation properties.",
    code: rotation,
  },
  "scale-example": {
    title: "Scale",
    description: "This is a basic m-video with scale properties.",
    code: scale,
  },
  "single-dimension-example": {
    title: "Single Dimension",
    description:
      "Specifying only one dimension will resize the element keeping the original aspect ratio.",
    code: singleDimension,
  },
};
