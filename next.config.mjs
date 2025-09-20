/** @type {import('next').NextConfig} */
const allowedDevOrigins = (
  process.env.NEXT_DEV_ALLOWED_ORIGINS || "http://localhost:3000"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const nextConfig = {
  // Use remotePatterns (domains is deprecated)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Allow LAN/dev cross-origin for Next internal resources during development
  allowedDevOrigins,
};

export default nextConfig;
