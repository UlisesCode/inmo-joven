/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@inmo-joven/database"],
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
