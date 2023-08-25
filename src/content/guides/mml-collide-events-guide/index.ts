import { DocsGuide } from "@/types/docs-guides";

import body from "./body.mdx";

const collisionEvents: DocsGuide = {
  title: "Collision Events",
  description: "Learn how to make MML content that can react to users colliding with it.",
  body,
  linkList: [
    "Related events",
    "Related attributes",
    "Basic example of element collision",
    "Example with multiple users and disconnection events",
    "Advanced example with collisionmove events",
  ],
};

export default collisionEvents;
