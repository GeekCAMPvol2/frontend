/** @type {import('next').NextConfig} */
const withInterceptStdout = require('next-intercept-stdout');

module.exports = withInterceptStdout(
  {
    reactStrictMode: false,
    images: {
      domains: ['thumbnail.image.rakuten.co.jp'],
    },
  },
  (text) =>
    text.includes('Duplicate atom key') ? '' : text
);
