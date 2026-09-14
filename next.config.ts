import type { NextConfig } from 'next';

const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: { unoptimized: true },
  async headers() {
    return [
      { source: '/:path*', headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' }
      ] },
      { source: '/media/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }] }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/images/logo/Plan%20de%20travail%201%20copie%205@4x.png',
        destination: '/images/logo/marrakech-palace-logo.png',
      },
      {
        source: '/images/logo/Plan de travail 1 copie 5@4x.png',
        destination: '/images/logo/marrakech-palace-logo.png',
      },
    ];
  },
};
export default config;
