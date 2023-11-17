import { Html, Main, Head as NextHead, NextScript } from "next/document";

import Head from "@/src/components/_head";
import Footer from "@/src/components/Footer";
import ScrollToTop from "@/src/components/ScrollToTop";

export default function Document() {
  return (
    <Html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <NextHead>
        <Head />
      </NextHead>
      <body className="bg-light-theme dark:bg-dark-theme">
        <Main />
        <NextScript />
        <Footer />
        <ScrollToTop />
      </body>
    </Html>
  );
}
