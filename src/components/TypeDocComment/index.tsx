import * as React from "react";
import ReactMarkdown from "react-markdown";

export default function TypeDocComment(props: { comment: { summary: { text: string }[] } }) {
  return (
    <ReactMarkdown className="font-mono text-base">
      {props.comment.summary
        .map(
          (descriptionText, index) =>
            descriptionText.text + (props.comment.summary[index + 1]?.text === "." ? "" : " "),
        )
        .join("")}
    </ReactMarkdown>
  );
}
