import relay from "./relay.config.js";

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  compiler: {
    relay,
  },
};
