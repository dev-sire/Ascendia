/** @type {import('next').NextConfig} */
const nextConfig = {
  reactProductionProfiling: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "k178x3aqyh.ucarecd.net",
      },
      { 
        protocol: "https", 
        hostname: "img.clerk.com" 
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev"
      },
    ],
  },
}

export default nextConfig