import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown/lib/ast-to-react";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";

import SyntaxHighlighter from "@/src/components/Common/SyntaxHighlighter";

const sharedTextStyle = "text-[#1B1B1B] dark:text-white";
export const sharedBodyStyle = `mt-8 text-xl leading-[32px] ${sharedTextStyle}`;
const sharedHeadingStyle = `font-medium ${sharedTextStyle}`;

export const components = {
  p: (props) => <p className={`${sharedBodyStyle} `} {...props} />,
  h1: (props) => (
    <h1
      className={`pt-[2em] text-[32px] leading-[41.6px] ${sharedHeadingStyle}`}
      {...props}
      id={props.children}
    />
  ),
  h2: (props) => <h2 className={`pt-[1.72em] text-[26px] leading-[31.2px]`} {...props} />,
  h3: (props) => (
    <h3 className={`mt-[.75em] text-[24px] leading-[31.2px] ${sharedHeadingStyle}`} {...props} />
  ),
  h4: (props) => (
    <h4 className={`mt-[.67em] text-[22px] ${sharedBodyStyle} font-medium`} {...props} />
  ),
  h5: (props) => (
    <h5
      className={`mt-[.5em] text-[20px] font-medium leading-[20.8px] ${sharedHeadingStyle}`}
      {...props}
    />
  ),
  h6: (props) => (
    <h6
      className={`mt-[.5em] text-[18px] font-medium leading-[20.8px] ${sharedHeadingStyle}`}
      {...props}
    />
  ),
  a: (props) => <a target="_blank" className="font-normal text-[#0069C2] underline" {...props} />,
  blockquote: (props) => (
    <blockquote
      className={`mt-[1.12em] rounded-md bg-[#F2F1F1] px-4 py-2 text-[14px] leading-[18.2px] text-[#0069C2] ${sharedTextStyle}`}
      {...props}
    />
  ),
  li: (props) => <li className={`${sharedBodyStyle} !mt-0`} {...props} />,
  ul: (props) => <ul className={`${sharedBodyStyle} !mt-1 ml-6 list-disc`} {...props} />,
  ol: (props) => <ol className={`!mt-2 ${sharedBodyStyle}`} {...props} />,
  code: (props) => (
    <code
      className={`!m-0 my-[1.12em] bg-[#F2F1F1] px-1 py-0.5 text-[20px] !text-[#e8912d] dark:bg-[#262626] ${sharedTextStyle}`}
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
