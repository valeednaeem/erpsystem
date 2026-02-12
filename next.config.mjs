/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // output: 'export', // Enables static exports
  // appDir: true,
  reactStrictMode: true,
  reactCompiler: true,
  basePath: '/erpsystem',
  experimental: {
    serverActions: true
  }
};

export default nextConfig;
