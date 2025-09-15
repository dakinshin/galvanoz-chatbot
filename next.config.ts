import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/chatbot',
  turbopack: {
    rules: {
      '*.txt': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
      '*.trie': {
        loaders: ['transform-loader'],
        as: '*.trie',
      },
    },
  },
  experimental: {
    turbopackScopeHoisting: false, // temporary fix of build issue: https://github.com/vercel/next.js/issues/82584
    serverActions: {
      allowedOrigins: [ // Add your actual domain(s)
        'galvanoz.ru',
        'dr.akinshin.su',
        'localhost:3000'
      ]
    }
  }
};

export default nextConfig;
