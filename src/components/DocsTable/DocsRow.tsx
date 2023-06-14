import Link from "next/link";
import * as React from "react";

import { tableBorder } from "@/src/components/DocsTable/DocsTableContainer";
import { MarkDown } from "@/src/config/mdx";

const StyledTD = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <td className={`h-10 p-2 pl-6 ${tableBorder} ${className} overflow-hidden text-ellipsis`}>
      {children}
    </td>
  );
};

export function DocsRow({
  name,
  description,
  link,
}: {
  name: string;
  description: string | string[];
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
        <MarkDown className="[&>p]:overflow-hidden [&>p]:text-ellipsis">{`${description}`}</MarkDown>
      </StyledTD>
    </tr>
  );
}
