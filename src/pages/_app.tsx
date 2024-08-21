import { MDXProvider } from "@mdx-js/react";
import type { AppProps } from "next/app";
import { Roboto, Roboto_Mono } from "next/font/google";

import "@/src/styles/index.css";

import { Providers } from "@/src/components/_providers";
import Header from "@/src/components/Header";
import { componentsBlog } from "@/src/config/mdx";

const robotoSans = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-roboto-mono",
  adjustFontFallback: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${robotoSans.variable} ${robotoMono.variable} font-sans text-black dark:text-white`}
    >
      <Providers>
        <MDXProvider components={componentsBlog}>
          <Header />
          <Component {...pageProps} />
        </MDXProvider>
      </Providers>
    </div>
  );
}
