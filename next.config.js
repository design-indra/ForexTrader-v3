/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-auth"],
  experimental: {
    serverComponentsExternalPackages: ["bcryptjs"],
  },
};

module.exports = nextConfig;
