import * as React from "react";
import ReactMarkdown from "react-markdown";

export default function TypeDocComment(props: { comment: { summary: { text: string }[] } }) {
  return (
    <>
      {props.comment.summary.map((descriptionText, index) => (
        <ReactMarkdown key={index}>{descriptionText.text}</ReactMarkdown>
      ))}
    </>
  );
}
