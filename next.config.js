/** @type {import('next').NextConfig} */
const nextConfig = {
  // 根据环境决定是否使用 export 模式（用于静态部署）
  // output: process.env.DEPLOY_TARGET === 'static' ? 'export' : undefined,
  
  trailingSlash: true,
  
  eslint: {
    ignoreDuringBuilds: false, // 生产环境中启用 ESLint 检查
  },
  
  typescript: {
    ignoreBuildErrors: false, // 生产环境中启用 TypeScript 检查
  },
  
  images: { 
    unoptimized: true,
    domains: ['www.grow-a-garden-calculator.org'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 性能优化配置
  experimental: {
    optimizeCss: false, // 暂时禁用以避免 critters 依赖问题
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // 压缩和性能设置
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // 环境变量
  env: {
    SITE_URL: process.env.SITE_URL || 'https://www.grow-a-garden-calculator.org',
    SITE_NAME: 'Grow a Garden Calculator',
  },
  
  // 生产环境安全头配置
  async headers() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY'
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin'
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block'
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=()'
            }
          ]
        },
        {
          source: '/sitemap.xml',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=86400, s-maxage=86400'
            }
          ]
        },
        {
          source: '/_next/static/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable'
            }
          ]
        }
      ];
    }
    return [];
  },
  
  // 重定向配置（如果需要）
  async redirects() {
    return [
      // 示例: 将旧路径重定向到新路径
      // {
      //   source: '/old-calculator',
      //   destination: '/',
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;
