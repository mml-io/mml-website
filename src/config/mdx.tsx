import { DetailedHTMLProps, HTMLProps, OlHTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import { Components, Options as ReactMarkdownOptions } from "react-markdown/lib";
import { twMerge } from "tailwind-merge";

import SyntaxHighlighter from "@/src/components/Common/SyntaxHighlighter";

const sharedTextStyle = "text-[#1B1B1B] dark:text-white";
export const sharedBodyStyle = `text-xl text-justify leading-[32px] ${sharedTextStyle}`;
const sharedHeadingStyle = `font-medium ${sharedTextStyle}`;

export const componentsBlog = {
  p: (props: HTMLProps<HTMLParagraphElement>) => (
    <p className={`${sharedBodyStyle} my-4`} {...props} />
  ),
  h1: (props: HTMLProps<HTMLHeadingElement> & { children: string }) => (
    <h1
      id={props.children.toLowerCase()}
      className={`${sharedHeadingStyle} scroll-m-8 pt-[1em] text-4xl leading-normal`}
      {...props}
    />
  ),
  h2: (props: HTMLProps<HTMLHeadingElement> & { children: string }) => (
    <h2
      id={props.children?.toLowerCase?.()}
      className={`${sharedHeadingStyle} mb-6 mt-10 scroll-m-20 p-0 text-2xl`}
      {...props}
    />
  ),
  h3: (props: HTMLProps<HTMLHeadingElement>) => (
    <h3 className={`${sharedHeadingStyle} my-4 text-xl`} {...props} />
  ),
  h4: (props: HTMLProps<HTMLHeadingElement>) => (
    <h4 className={`my-4 text-[22px] ${sharedBodyStyle} font-medium`} {...props} />
  ),
  h5: (props: HTMLProps<HTMLHeadingElement>) => (
    <h5
      className={`${sharedHeadingStyle} my-4 text-[20px] font-medium leading-[20.8px]`}
      {...props}
    />
  ),
  h6: (props: HTMLProps<HTMLHeadingElement>) => (
    <h6
      className={`${sharedHeadingStyle} my-4 text-[18px] font-medium leading-[20.8px]`}
      {...props}
    />
  ),
  hr: (props: HTMLProps<HTMLHRElement>) => (
    <hr
      className="my-10 block border-b border-t-0 border-[#00000099] dark:border-[#FFFFFF99]"
      {...props}
    />
  ),
  li: (props: HTMLProps<HTMLLIElement>) => <li className={`${sharedBodyStyle} !mt-0`} {...props} />,
  ul: (props: HTMLProps<HTMLUListElement>) => (
    <ul className={`${sharedBodyStyle} !mt-1 ml-6 list-disc`} {...props} />
  ),
  ol: (props: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
    <ol className={`!mt-2 ${sharedBodyStyle}`} {...props} />
  ),
  code: (props: HTMLProps<HTMLElement>) => (
    <code
      className={`!m-0 my-[1.12em] bg-[#F2F1F1] px-1 py-0.5 text-base !text-[#e8912d] dark:bg-[#262626] ${sharedTextStyle}`}
      {...props}
    />
  ),
  pre: ({ props, children }: { props: HTMLProps<HTMLPreElement>; children: any }) => (
    <pre
      className={twMerge(`font-mono ${sharedBodyStyle}`, "mb-4 break-after-all text-base")}
      {...props}
    >
      <SyntaxHighlighter {...children.props} />
    </pre>
  ),
  img: (props: HTMLProps<HTMLImageElement>) => <img className="mx-auto my-4 w-full" {...props} />,
};

export const MarkDownBlog = (props: ReactMarkdownOptions) => (
  <ReactMarkdown {...props} components={componentsBlog as unknown as Components}>
    {props.children}
  </ReactMarkdown>
);

export const sharedBodyStyleDocs = `text-base text-justify leading-[32px] ${sharedTextStyle}`;
export const componentsDocs = {
  ...componentsBlog,
  p: (props: HTMLProps<HTMLParagraphElement>) => (
    <p className={`${sharedBodyStyleDocs} my-2 text-[1.0625rem] font-sans`} {...props} />
  ),
  li: (props: HTMLProps<HTMLLIElement>) => (
    <li className={`${sharedBodyStyleDocs} !mt-0`} {...props} />
  ),
  ul: (props: HTMLProps<HTMLUListElement>) => (
    <ul className={`${sharedBodyStyleDocs} !mt-1 ml-6 list-disc`} {...props} />
  ),
  ol: (props: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
    <ol className={`!mt-2 ${sharedBodyStyle}`} {...props} />
  ),
  code: (props: HTMLProps<HTMLElement>) => (
    <code
      className={`!m-0 my-[1.12em] bg-[#F2F1F1] px-1 py-0.5 text-base !text-[#e8912d] dark:bg-[#262626] ${sharedTextStyle}`}
      {...props}
    />
  ),
  pre: ({ props, children }: { props: HTMLProps<HTMLPreElement>; children: any }) => (
    <pre
      className={twMerge(`font-sans ${sharedBodyStyleDocs}`, "mb-4 break-after-all text-base")}
      {...props}
    >
      <SyntaxHighlighter {...children.props} />
    </pre>
  ),
};

export const MarkDownDocs = (props: ReactMarkdownOptions) => (
  <ReactMarkdown {...props} components={componentsDocs as unknown as Components}>
    {props.children}
  </ReactMarkdown>
);
