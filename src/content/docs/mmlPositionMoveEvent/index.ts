import moveCheck from "@/src/content/docs/mmlPositionMoveEvent/move-check.mml";
import movingObject from "@/src/content/docs/mmlPositionMoveEvent/moving-object.mml";
import primary from "@/src/content/docs/mmlPositionMoveEvent/primary.mml";
import rotation from "@/src/content/docs/mmlPositionMoveEvent/rotation.mml";
import { CLIENT_TYPES, DocsExamples } from "@/types/docs-reference";

export const examples: DocsExamples = {
  primary: {
    title: "Position Move Event",
    description: "When the user moves within the probe area the position is shown on the label.",
    code: primary,
    clients: [CLIENT_TYPES.AVATAR],
  },
  moveCheck: {
    title: "Move Check",
    description: "The label changes color when a user moves within the probe area.",
    code: moveCheck,
    clients: [CLIENT_TYPES.AVATAR],
  },
  rotation: {
    title: "Rotation",
    description: "The label shows the rotation of the user within the probe area.",
    code: rotation,
    clients: [CLIENT_TYPES.AVATAR],
  },
  movingObject: {
    title: "Moving Object",
    description: "An object follows every user that moves within the probe area.",
    code: movingObject,
    clients: [CLIENT_TYPES.AVATAR, CLIENT_TYPES.AVATAR],
  },
};
