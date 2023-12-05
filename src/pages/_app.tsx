import { MDXProvider } from "@mdx-js/react";
import type { AppProps } from "next/app";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import "@/src/styles/index.css";

import { Providers } from "@/src/components/_providers";
import Header from "@/src/components/Header";
import { componentsBlog } from "@/src/config/mdx";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  adjustFontFallback: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans text-black dark:text-white`}
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
