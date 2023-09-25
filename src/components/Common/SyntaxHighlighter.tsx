import dynamic from "next/dynamic";
import { solarizedlight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CSSRuleObject } from "tailwindcss/types/config";

import { sharedBodyStyle } from "@/src/config/mdx";

type SyntaxHighlighterProps = {
  style: any;
  language: string;
  children: React.ReactNode;
  className: string;
  wrapLines: boolean;
  lineProps: CSSRuleObject;
};

const SyntaxHighlighterComponent = dynamic<Partial<SyntaxHighlighterProps>>(
  () => import("react-syntax-highlighter").then((mod) => mod.PrismLight),
  { ssr: false },
);

const SyntaxHighlighter = ({ className, children }) => {
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
