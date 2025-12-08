/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        weatherApiKey: '6457f95cbf454c55b43203259232212',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.weatherapi.com',
                pathname: '/weather/**',
            },
        ],
    },
}

module.exports = nextConfig
