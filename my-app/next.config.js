/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['prawnbox.com', 'app.prawnbox.com', 'prawnboxx.vercel.app', 'app.prawnboxx.vercel.app'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*',
      },
      {
        source: '/user/:path*',
        destination: 'http://localhost:4000/user/:path*',
      },
      {
        source: '/auth/:path*',
        destination: 'http://localhost:4000/auth/:path*',
      },
      {
        source: '/profile/:path*',
        destination: 'http://localhost:4000/profile/:path*',
      },
      {
        source: '/dashboard/:path*',
        destination: 'http://localhost:4000/dashboard/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'http://localhost:3000' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-Requested-With' },
        ],
      },
    ];
  },
  // Ensure proxy forwards all headers
  experimental: {
    proxyTimeout: 30000,
  },
};

module.exports = nextConfig;