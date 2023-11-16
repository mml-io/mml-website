import primary from "@/src/content/docs/mmlCollisionStartEvent/primary.mml";
import { CLIENT_TYPES, DocsExamples } from "@/types/docs-reference";

export const examples: DocsExamples = {
  primary: {
    title: "Collision start event",
    description: "The label shows the connection id of the user colliding with the platform.",
    code: primary,
    clients: [CLIENT_TYPES.AVATAR, CLIENT_TYPES.AVATAR],
    baseSceneOn: false,
  },
};
