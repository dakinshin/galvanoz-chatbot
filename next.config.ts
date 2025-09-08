import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/chatbot',
  turbopack: {
    rules: {
      '*.txt': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
  experimental: {
    turbopackScopeHoisting: false // temporary fix of build issue: https://github.com/vercel/next.js/issues/82584
  }
};

export default nextConfig;
