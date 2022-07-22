/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: `${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`, // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig
