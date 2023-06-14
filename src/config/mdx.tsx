import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown/lib/ast-to-react";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";

import SyntaxHighlighter from "@/src/components/Common/SyntaxHighlighter";

const sharedTextStyle = "text-[#1B1B1B] dark:text-white";
export const sharedBodyStyle = `my-4 text-[16px] leading-[20.8px] ${sharedTextStyle}`;
const sharedHeadingStyle = `font-medium ${sharedTextStyle}`;

export const components = {
  p: (props) => <p className={sharedBodyStyle} {...props} />,
  h1: (props) => (
    <h1 className={`my-[.67em] text-[32px] leading-[41.6px] ${sharedHeadingStyle}`} {...props} />
  ),
  h2: (props) => (
    <h2 className={`my-[.75em] text-[24px] leading-[31.2px] ${sharedHeadingStyle}`} {...props} />
  ),
  h3: (props) => (
    <h3 className={`my-[.75em] text-[24px] leading-[31.2px] ${sharedHeadingStyle}`} {...props} />
  ),
  h4: (props) => <h4 className={`my-[1.12em] ${sharedBodyStyle}`} {...props} />,
  h5: (props) => (
    <h5 className={`my-[1.5em] text-[16px] leading-[20.8px] ${sharedHeadingStyle}`} {...props} />
  ),
  h6: (props) => (
    <h6 className={`my-[1.67em] text-[16px] leading-[20.8px] ${sharedHeadingStyle}`} {...props} />
  ),
  a: (props) => <a className="font-normal text-[#0069C2] underline" {...props} />,
  blockquote: (props) => (
    <blockquote
      className={`my-[1.12em] rounded-md bg-[#F2F1F1] px-4 py-2 text-[14px] leading-[18.2px] text-[#0069C2] ${sharedTextStyle}`}
      {...props}
    />
  ),
  li: (props) => <li className={`my-2 ${sharedBodyStyle}`} {...props} />,
  ul: (props) => <ul className={`my-2 ${sharedBodyStyle}`} {...props} />,
  ol: (props) => <ol className={`my-2 ${sharedBodyStyle}`} {...props} />,
  code: (props) => (
    <code
      className={`my-[1.12em] bg-[#F2F1F1] px-1 py-0.5 text-[14px] leading-[18.2px] !text-[#0069C2] dark:bg-[#262626] ${sharedTextStyle}`}
      {...props}
    />
  ),
  pre: ({ children, props }) => (
    <pre className={`font-mono ${sharedBodyStyle}`} {...props}>
      <SyntaxHighlighter {...children.props} />
    </pre>
  ),
};

export const MarkDown = (props: ReactMarkdownOptions) => (
  <ReactMarkdown {...props} components={components as unknown as Components}>
    {props.children}
  </ReactMarkdown>
);
