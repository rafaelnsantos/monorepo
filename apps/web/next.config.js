const withTM = require("next-transpile-modules")(["ui", "redox"]);
const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
};

module.exports = withTM(withPWA(config));
