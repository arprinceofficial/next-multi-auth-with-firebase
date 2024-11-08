/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ['queue.arprince.me'],
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'queue.arprince.me',
                pathname: '/img/**', // Adjust this to match your image paths
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'graph.facebook.com',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                pathname: '**',
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
