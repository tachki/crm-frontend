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

export default nextConfig;