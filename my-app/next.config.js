/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['prawnbox.com', 'app.prawnbox.com', 'prawnboxx.vercel.app', 'app.prawnboxx.vercel.app', 'https://prawn-front.vercel.app/'],
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/user/:path*',
        destination: `${backendUrl}/user/:path*`,
      },
      {
        source: '/auth/:path*',
        destination: `${backendUrl}/auth/:path*`,
      },
      {
        source: '/profile/:path*',
        destination: `${backendUrl}/profile/:path*`,
      },
      {
        source: '/dashboard/:path*',
        destination: `${backendUrl}/dashboard/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://prawn-front.vercel.app/' },
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