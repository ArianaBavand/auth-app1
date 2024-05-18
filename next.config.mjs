/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: 'admin',
    mongodb_password: 'Ariana24we',
    mongodb_clustername: 'cluster0',
    mongodb_database: 'auth',
  },
};

export default nextConfig;
