/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
      ignoreDuringBuilds: true,
  },
  images: {
    domains: ['i.pinimg.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
          pathname: '/**',
        },
      ],
    },
};


export default nextConfig;

