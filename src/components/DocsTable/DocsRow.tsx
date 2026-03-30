import Link from "next/link";
import * as React from "react";

import TypeDocComment from "@/src/components/TypeDocComment";
import { MarkDownDocs } from "@/src/config/mdx";

function isComment(
  arg: string | string[] | { summary: { text: string }[] },
): arg is { summary: { text: string }[] } {
  return (arg as { summary: { text: string }[] }).summary !== undefined;
}

export function DocsRow({
  name,
  description,
  link,
}: {
  name: string;
  description?: string | string[] | { summary: { text: string }[] };
  link: string;
}) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-black/5 dark:border-white/5 last:border-0">
      <Link href={link} className="shrink-0">
        <code className="bg-code-bg text-code-text dark:text-code-text-dark dark:bg-code-bg-dark text-sm font-medium px-2 py-0.5 rounded">
          {name}
        </code>
      </Link>
      <span className="text-sm opacity-70 leading-relaxed">
        {description && isComment(description) ? (
          <TypeDocComment comment={description} />
        ) : (
          <MarkDownDocs className="text-sm [&>p]:mt-0 [&>p]:text-sm">{`${(Array.isArray(description)
            ? description
            : [description]
          ).map((text) =>
            (text || "")
              .split("\n")
              .map((line) => line.trim())
              .join(" ")
              .replaceAll("  ", " "),
          )}`}</MarkDownDocs>
        )}
      </span>
    </li>
  );
}
