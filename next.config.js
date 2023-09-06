const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  async rewrites() {
    return [
      // Rewrite API routes for next-auth
      {
        source: '/api/auth/:path*',
        destination: 'https://example.com/api/auth/:path*', // Replace with your authentication provider URL
      },
    ];
  },
};

module.exports = nextConfig;
