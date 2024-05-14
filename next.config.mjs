/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['cqpbvzzoppmjwaqevelu.supabase.co']
    }
};

export default nextConfig;
