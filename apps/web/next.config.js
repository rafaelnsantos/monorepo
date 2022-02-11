const withTM = require("next-transpile-modules")([
  "redox",
  "@gorhom/bottom-sheet",
  "@gorhom/portal",
]);
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  webpack5: true,
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
  },
  projectRoot: __dirname,
};

module.exports = withPlugins([withTM, withPWA, withExpo], config);
