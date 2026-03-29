import { DocsGuide } from "@/types/docs-guides";

import body from "./body.mdx";

const getStarted: DocsGuide = {
  title: "Get Started",
  description: "Learn how to create and serve MML documents.",
  body,
  linkList: ["Static vs Interactive Documents", "MML Editor", "MML CLI", "MML Viewer"],
};

export default getStarted;
