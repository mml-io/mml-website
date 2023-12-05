import * as React from "react";

import { MarkDownDocs } from "@/src/config/mdx";

export default function TypeDocComment(props: { comment: { summary: { text: string }[] } }) {
  return (
    <MarkDownDocs className="text-[1.0625rem] mt-2 [&>p]:mt-0">
      {props.comment.summary
        .map(
          (descriptionText, index) =>
            descriptionText.text + (props.comment.summary[index + 1]?.text === "." ? "" : " "),
        )
        .join("")}
    </MarkDownDocs>
  );
}
