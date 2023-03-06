/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/_error',
  //       destination: '/profile',
  //       permanent: true,
  //     },
  //     {
  //       source: '/404',
  //       destination: '/profile',
  //       permanent: true,
  //     },
  //   ];
  // },
}

module.exports = nextConfig
