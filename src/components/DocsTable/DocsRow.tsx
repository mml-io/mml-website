import Link from "next/link";
import * as React from "react";

import { tableBorder } from "@/src/components/DocsTable/DocsTableContainer";
import TypeDocComment from "@/src/components/TypeDocComment";
import { MarkDown } from "@/src/config/mdx";

const StyledTD = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <td className={`h-10 p-2 px-6 ${tableBorder} ${className} overflow-hidden text-ellipsis`}>
      {children}
    </td>
  );
};

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
    <tr>
      <StyledTD>
        <Link href={link}>
          <code className="bg-[#F2F1F1] p-0.5 font-mono !text-[#0069C2] dark:bg-[#262626]">
            {name}
          </code>
        </Link>
      </StyledTD>
      <StyledTD>
        {description && isComment(description) ? (
          <TypeDocComment comment={description} />
        ) : (
          <MarkDown className="text-base [&>*]:text-ellipsis [&>p]:mt-0 [&>p]:overflow-hidden [&>p]:font-mono">{`${description}`}</MarkDown>
        )}
      </StyledTD>
    </tr>
  );
}
