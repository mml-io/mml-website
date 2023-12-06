import Link from "next/link";
import * as React from "react";

import TypeDocComment from "@/src/components/TypeDocComment";
import { MarkDownDocs } from "@/src/config/mdx";

const StyledElement = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={`inline-block ${className} text-[1.0625rem] whitespace-break-spaces`}>
      {children}
    </p>
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
    <li className="relative before:absolute dark:before:bg-white before:bg-black before:-left-5 before:h-2 before:w-2 before:top-[0.6rem] before:rounded">
      <StyledElement>
        <Link href={link}>
          <code className="bg-[#F2F1F1] !text-[#0069C2] text-lg dark:bg-[#262626]">{name}</code>
        </Link>
        <span className="pl-4 block">
          {description && isComment(description) ? (
            <TypeDocComment comment={description} />
          ) : (
            <MarkDownDocs className="text-base mt-2 [&>p]:mt-0">{`${description}`}</MarkDownDocs>
          )}
        </span>
      </StyledElement>
    </li>
  );
}
