import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown/lib/ast-to-react";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { twMerge } from "tailwind-merge";

import SyntaxHighlighter from "@/src/components/Common/SyntaxHighlighter";

const sharedTextStyle = "text-[#1B1B1B] dark:text-white";
export const sharedBodyStyle = `text-base text-justify leading-[32px] font-mono ${sharedTextStyle}`;
const sharedHeadingStyle = `font-medium ${sharedTextStyle}`;

export const components = {
  p: (props) => <p className={`${sharedBodyStyle} my-4`} {...props} />,
  h1: (props) => (
    <h1
      id={props.children.toLowerCase()}
      className={`${sharedHeadingStyle} scroll-m-2 pt-[1em] text-4xl leading-normal`}
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      id={props.children?.toLowerCase?.()}
      className={`${sharedHeadingStyle} mb-6 mt-10 scroll-m-8 p-0 text-2xl`}
      {...props}
    />
  ),
  h3: (props) => <h3 className={`${sharedHeadingStyle} my-4 text-xl`} {...props} />,
  h4: (props) => <h4 className={`my-4 text-[22px] ${sharedBodyStyle} font-medium`} {...props} />,
  h5: (props) => (
    <h5
      className={`${sharedHeadingStyle} my-4 text-[20px] font-medium leading-[20.8px]`}
      {...props}
    />
  ),
  h6: (props) => (
    <h6
      className={`${sharedHeadingStyle} my-4 text-[18px] font-medium leading-[20.8px]`}
      {...props}
    />
  ),
  hr: (props) => (
    <hr
      className="my-10 block border-b border-t-0 border-[#00000099] dark:border-[#FFFFFF99]"
      {...props}
    />
  ),
  a: (props) => <a target="_blank" className="font-normal text-[#0069C2] underline" {...props} />,
  blockquote: (props) => (
    <blockquote
      className={`${sharedTextStyle} mt-[1.12em] rounded-md bg-[#F2F1F1] px-4 py-2 text-[14px] leading-[18.2px] text-[#0069C2]`}
      {...props}
    />
  ),
  li: (props) => <li className={`${sharedBodyStyle} !mt-0`} {...props} />,
  ul: (props) => <ul className={`${sharedBodyStyle} !mt-1 ml-6 list-disc`} {...props} />,
  ol: (props) => <ol className={`!mt-2 ${sharedBodyStyle}`} {...props} />,
  code: (props) => (
    <code
      className={`!m-0 my-[1.12em] bg-[#F2F1F1] px-1 py-0.5 text-base !text-[#e8912d] dark:bg-[#262626] ${sharedTextStyle}`}
      {...props}
    />
  ),
  pre: ({ children, props }) => (
    <pre
      className={twMerge(
        `font-mono ${sharedBodyStyle}`,
        "mb-4 max-w-[800px] break-after-all text-base",
      )}
      {...props}
    >
      <SyntaxHighlighter {...children.props} />
    </pre>
  ),
  img: (props) => <img className="mx-auto my-4" {...props} />,
};

export const MarkDown = (props: ReactMarkdownOptions) => (
  <ReactMarkdown {...props} components={components as unknown as Components}>
    {props.children}
  </ReactMarkdown>
);
