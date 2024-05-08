/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login', // Redirige '/' a '/login'
        permanent: true
      }
    ]
  }
}
