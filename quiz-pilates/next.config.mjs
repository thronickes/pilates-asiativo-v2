/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.harna-app.com',
            },
            {
                protocol: 'https',
                hostname: 'pilates.harnafit.com',
            },
            {
                protocol: 'https',
                hostname: 'unimeal.com',
            },
        ],
    },
    output: 'standalone',
};

export default nextConfig;
