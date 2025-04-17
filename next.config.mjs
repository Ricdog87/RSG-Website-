// Füge eine next.config.mjs hinzu, um Probleme mit Abhängigkeiten zu beheben
let userConfig = undefined
try {
 // try to import ESM first
 userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
 try {
   // fallback to CJS import
   userConfig = await import("./v0-user-next.config");
 } catch (innerError) {
   // ignore error
 }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
 reactStrictMode: true,
 swcMinify: true,
 transpilePackages: ["three"],
 webpack: (config) => {
   config.resolve.alias = {
     ...config.resolve.alias,
     // Füge hier bei Bedarf Aliase hinzu
   };
   return config;
 },
 eslint: {
   ignoreDuringBuilds: true,
 },
 typescript: {
   ignoreBuildErrors: true,
 },
 images: {
   formats: ['image/avif', 'image/webp'],
   minimumCacheTTL: 31536000,
   deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
   imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 320, 420, 768, 1024, 1200],
   domains: ['deine-domain.de', 'res.cloudinary.com'],
   remotePatterns: [],
   unoptimized: false,
 },
 experimental: {
   webpackBuildWorker: true,
   parallelServerBuildTraces: true,
   parallelServerCompiles: true,
   optimizeCss: true, // CSS-Optimierung aktivieren
   optimizePackageImports: ['lucide-react', '@react-three/drei'],
 },
}

if (userConfig) {
 // ESM imports will have a "default" property
 const config = userConfig.default || userConfig

 for (const key in config) {
   if (
     typeof nextConfig[key] === 'object' &&
     !Array.isArray(nextConfig[key])
   ) {
     nextConfig[key] = {
       ...nextConfig[key],
       ...config[key],
     }
   } else {
     nextConfig[key] = config[key]
   }
 }
}

export default nextConfig
