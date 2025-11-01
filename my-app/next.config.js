/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['prawnbox.com', 'app.prawnbox.com', 'prawnboxx.vercel.app', 'app.prawnboxx.vercel.app', 'https://prawn-front.vercel.app/'],
  },
  async rewrites() {
    // In production, use NEXT_PUBLIC_API_BASE_URL, fallback to localhost:4000 for development
    const isProduction = process.env.NODE_ENV === 'production';
    const backendUrl = isProduction 
      ? process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-prawnbox.onrender.com'
      : 'http://localhost:4000';
    
    console.log('Using backend URL:', backendUrl);
    
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
    const allowedOrigins = [
      'https://prawn-front.vercel.app',
      'https://prawnbox.com',
      'http://localhost:3000',
      'http://localhost:4000'
    ];

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: allowedOrigins.join(', ') },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
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