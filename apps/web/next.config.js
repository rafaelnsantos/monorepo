const withTM = require("next-transpile-modules")(["ui", "redox"]);
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
  },
};

module.exports = withTM(withPWA(config));
