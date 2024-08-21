import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
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
