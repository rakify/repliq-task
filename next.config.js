/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'www.prada.com',
      'i.postimg.cc',
      'res.cloudinary.com',
    ],
  },
};

module.exports = nextConfig;
