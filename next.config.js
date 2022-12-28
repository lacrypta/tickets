/** @type {import('next').NextConfig} */

const { withAxiom } = require("next-axiom");

const nextConfig = withAxiom({
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});

module.exports = nextConfig;
