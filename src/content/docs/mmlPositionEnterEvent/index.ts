import multipleUsers from "@/src/content/docs/mmlPositionEnterEvent/multiple-users.mml";
import primary from "@/src/content/docs/mmlPositionEnterEvent/primary.mml";
import { CLIENT_TYPES, DocsExamples } from "@/types/docs-reference";

export const examples: DocsExamples = {
  primary: {
    title: "Collision end event",
    description: "The label changes color when a user enters the probe area.",
    code: primary,
    baseSceneOn: false,
    clients: [CLIENT_TYPES.AVATAR],
  },
  multipleUsers: {
    title: "Multiple users",
    description: "The label shows the connection id of the users who entered the probe area.",
    code: multipleUsers,
    baseSceneOn: false,
    clients: [CLIENT_TYPES.AVATAR, CLIENT_TYPES.AVATAR],
  },
};
