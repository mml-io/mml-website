


/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {



















    // stub the fs module
    config.resolve.fallback = {
      fs: false,
    };

    return config;
  },

};
















