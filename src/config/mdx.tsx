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
      className={`!m-0 my-[1.12em] bg-code-bg px-1 py-0.5 text-base text-mdx-code-text dark:bg-code-bg-dark ${sharedTextStyle}`}
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

const docsTextStyle = "text-[#1B1B1B] dark:text-slate-200";
const docsBodyStyle = `text-[1.0625rem] leading-7 ${docsTextStyle}`;

export const componentsDocs = {
  p: (props: HTMLProps<HTMLParagraphElement>) => (
    <p className={`${docsBodyStyle} my-4`} {...props} />
  ),
  h1: (props: HTMLProps<HTMLHeadingElement> & { children: string }) => (
    <h1
      id={props.children?.toLowerCase?.()}
      className={`scroll-m-8 text-3xl font-bold tracking-tight ${docsTextStyle} mt-2 mb-4`}
      {...props}
    />
  ),
  h2: (props: HTMLProps<HTMLHeadingElement> & { children: string }) => (
    <h2
      id={props.children?.toLowerCase?.()}
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${docsTextStyle} mt-12 mb-4 pb-2 border-b border-black/10 dark:border-white/10`}
      {...props}
    />
  ),
  h3: (props: HTMLProps<HTMLHeadingElement>) => (
    <h3 className={`text-lg font-semibold ${docsTextStyle} mt-8 mb-3`} {...props} />
  ),
  h4: (props: HTMLProps<HTMLHeadingElement>) => (
    <h4 className={`text-base font-semibold ${docsTextStyle} mt-6 mb-2`} {...props} />
  ),
  hr: (props: HTMLProps<HTMLHRElement>) => (
    <hr className="my-8 border-b border-t-0 border-black/10 dark:border-white/10" {...props} />
  ),
  li: (props: HTMLProps<HTMLLIElement>) => <li className={`${docsBodyStyle} !mt-0`} {...props} />,
  ul: (props: HTMLProps<HTMLUListElement>) => (
    <ul className={`${docsBodyStyle} !mt-1 ml-6 list-disc`} {...props} />
  ),
  ol: (props: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
    <ol className={`${docsBodyStyle} !mt-2 ml-6 list-decimal`} {...props} />
  ),
  code: (props: HTMLProps<HTMLElement>) => (
    <code
      className="rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[0.9375rem] text-slate-800 dark:text-slate-200 font-mono"
      {...props}
    />
  ),
  pre: ({ props, children }: { props: HTMLProps<HTMLPreElement>; children: any }) => (
    <pre className="my-5 overflow-hidden rounded-lg" {...props}>
      <SyntaxHighlighter {...children.props} />
    </pre>
  ),
  strong: (props: HTMLProps<HTMLElement>) => <strong className="font-semibold" {...props} />,
  a: (props: HTMLProps<HTMLAnchorElement>) => (
    <a className="text-link-text dark:text-link-text-dark underline" {...props} />
  ),
  img: (props: HTMLProps<HTMLImageElement>) => (
    <img className="mx-auto my-6 w-full rounded-lg" {...props} />
  ),
};

export const MarkDownDocs = (props: ReactMarkdownOptions) => (
  <ReactMarkdown {...props} components={componentsDocs as unknown as Components}>
    {props.children}
  </ReactMarkdown>
);
