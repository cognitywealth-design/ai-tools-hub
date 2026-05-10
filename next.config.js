/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
};

module.exports = nextConfig;
