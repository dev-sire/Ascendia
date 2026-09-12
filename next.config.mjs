/** @type {import('next').NextConfig} */
const nextConfig = {
  reactProductionProfiling: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "k178x3aqyh.ucarecd.net",
      },
    ],
  },
}

export default nextConfig