import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { MDXProvider } from "@mdx-js/react";
import type { AppProps } from "next/app";
import { Inter, JetBrains_Mono } from "next/font/google";

import "@/src/styles/index.css";

config.autoAddCss = false;

import { Providers } from "@/src/components/_providers";
import Header from "@/src/components/Header";
import { componentsBlog } from "@/src/config/mdx";

const interSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${interSans.variable} ${jetbrainsMono.variable} font-sans text-black dark:text-white`}
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
