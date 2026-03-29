import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable built-in gzip so that Content-Length is preserved on responses.
  // This enables download progress tracking in Three.js's FileLoader.
  // In production, compression is handled by the CDN/reverse proxy.
  compress: false,
  productionBrowserSourceMaps: true,
  redirects: async () => {
    return [
      {
        source: "/docs/guides",
        destination: "/docs",
        permanent: true,
      },
      {
        source: "/docs/reference",
        destination: "/docs",
        permanent: true,
      },
      {
        source: "/docs/reference/elements",
        destination: "/docs#elements",
        permanent: true,
      },
      {
        source: "/docs/reference/events",
        destination: "/docs#events",
        permanent: true,
      },
      {
        source: "/.well-known/llms.txt",
        destination: "/llms.txt",
        permanent: true,
      },
      {
        source: "/llms-full.md",
        destination: "/llms-full.txt",
        permanent: true,
      },
      {
        source: "/llms.md",
        destination: "/llms.txt",
        permanent: true,
      },
    ];
  },
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.xsd/,
        use: [
          {
            loader: "raw-loader",
          },
        ],
      },
      {
        test: /\.mml/,
        use: [
          {
            loader: "raw-loader",
          },
        ],
      },
      {
        test: /\.(glb|hdr)/,
        type: "asset/resource",
      },
    );

    // stub the fs module
    config.resolve.fallback = {
      fs: false,
    };

    return config;
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react",
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
