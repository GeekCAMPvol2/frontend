/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withInterceptStdout = require('next-intercept-stdout');

module.exports = withInterceptStdout(
  {
    nextConfig,
    images: {
      domains: ['thumbnail.image.rakuten.co.jp'],
    },
  },
  (text) =>
    text.includes('Duplicate atom key') ? '' : text
);
