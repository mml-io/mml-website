import dynamic from "next/dynamic";
import { HTMLProps } from "react";
import { solarizedlight } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { sharedBodyStyle } from "@/src/config/mdx";

type SyntaxHighlighterProps = {
  style?: any;
  language?: string;
  children: string | string[];
  className?: string;
  wrapLines?: boolean;
  lineProps?: HTMLProps<HTMLElement> | ((lineNumber: number) => HTMLProps<HTMLElement>);
};

const SyntaxHighlighterComponent = dynamic<SyntaxHighlighterProps>(
  () => import("react-syntax-highlighter").then((mod) => mod.PrismLight),
  { ssr: false },
);

const SyntaxHighlighter = ({
  className,
  children,
}: {
  className: string;
  children: string | string[];
}) => {
  const languageInternal = className?.replace(/language-/, "");

  return (
    <SyntaxHighlighterComponent
      lineProps={{ style: { wordBreak: "break-word", whiteSpace: "pre-wrap" } }}
      wrapLines={true}
      style={solarizedlight}
      language={languageInternal}
      children={children}
      className={`rounded bg-[#F5F5F5] p-4 text-sm text-[#1B1B1B] ${sharedBodyStyle} ${className}`}
    />
  );
};

export default SyntaxHighlighter;
