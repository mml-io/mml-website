import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { HTMLProps, useEffect, useState } from "react";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const codeTheme = isDark ? oneDark : oneLight;

  return (
    <div data-language={languageInternal || undefined}>
      <SyntaxHighlighterComponent
        lineProps={{ style: { wordBreak: "break-word", whiteSpace: "pre-wrap" } }}
        wrapLines={true}
        style={codeTheme}
        language={languageInternal}
        children={children}
        className={`!rounded-lg !text-sm !leading-relaxed ${className}`}
      />
    </div>
  );
};

export default SyntaxHighlighter;
