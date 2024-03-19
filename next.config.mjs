/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{
      source: '/',
      destination: '/login',
      permanent: true,
    },]
  },
};

export default nextConfig;
