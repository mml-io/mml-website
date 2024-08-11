import collisionEvents from "@/src/content/guides/mml-collide-events-guide";
import mmlWithReactGuide from "@/src/content/guides/mml-with-react-guide";
import { DocsGuide, DocsGuidesByName } from "@/types/docs-guides";

import hosting from "src/content/guides/mml-starter-project-hosting";

export const orderedGuidesList: Array<{ id: string; guide: DocsGuide }> = [
  { id: "mml-starter-project-hosting", guide: hosting },
  { id: "mml-collide-events-guide", guide: collisionEvents },
  { id: "mml-with-react", guide: mmlWithReactGuide },
];

export const guides: DocsGuidesByName = orderedGuidesList.reduce(
  (acc, { id, guide }) => ({ ...acc, [id]: guide }),
  {},
);
