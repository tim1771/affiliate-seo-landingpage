/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to prevent timeout during build of 34,000+ pages.
  // Netlify will now use its Next.js runtime to handle pages dynamically.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
