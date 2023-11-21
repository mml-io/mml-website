import multipleUsers from "@/src/content/docs/mmlPositionLeaveEvent/multiple-users.mml";
import primary from "@/src/content/docs/mmlPositionLeaveEvent/primary.mml";
import { CLIENT_TYPES, DocsExamples } from "@/types/docs-reference";

export const examples: DocsExamples = {
  primary: {
    title: "Collision end event",
    description: "The label changes color when a user leaves the probe area.",
    code: primary,
    baseSceneOn: false,
    clients: [CLIENT_TYPES.AVATAR],
  },
  multipleUsers: {
    title: "Multiple users",
    description: "The label shows the connection id of the users who left the probe area.",
    code: multipleUsers,
    baseSceneOn: false,
    clients: [CLIENT_TYPES.AVATAR, CLIENT_TYPES.AVATAR],
  },
};
