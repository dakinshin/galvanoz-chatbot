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
    turbopackScopeHoisting: false, // temporary fix of build issue: https://github.com/vercel/next.js/issues/82584
    serverActions: {
      allowedOrigins: ["dr.akinshin.su", "localhost:3000"] // Add your actual domain(s)
    }
  }
};

export default nextConfig;
