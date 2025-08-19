/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com', // Allow Cloudinary images
      'via.placeholder.com' // Allow placeholder images for development
    ],
  },
};

export default nextConfig;
