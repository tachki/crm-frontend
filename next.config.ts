import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/', // Откуда будет происходить редирект
        destination: '/auth', // Куда будет происходить редирект
        permanent: false, // Если false, это временный редирект (302)
      },
    ];
  },
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/cars/**',
      },
    ],
  },
};


export default nextConfig;