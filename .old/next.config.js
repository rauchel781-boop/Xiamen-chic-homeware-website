/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'xmchichomeware.com' },
      { protocol: 'https', hostname: '**.xmchichomeware.com' },
    ],
  },
};
module.exports = nextConfig;
