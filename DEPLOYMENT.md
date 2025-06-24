# 部署指南

本指南将帮助您将 Grow a Garden Calculator 部署到各种平台。

## 🚀 快速部署

### Vercel (推荐)

1. **Fork 或上传项目到 GitHub**
2. **连接 Vercel**:
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账户登录
   - 点击 "New Project"
   - 选择您的仓库

3. **配置环境变量**:
   ```
   SITE_URL=https://your-domain.vercel.app
   SITE_NAME=Grow a Garden Calculator
   NODE_ENV=production
   ```

4. **部署设置**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Netlify

1. **连接 GitHub 仓库**
2. **构建设置**:
   ```
   Build command: npm run build && npm run export
   Publish directory: out
   ```

3. **环境变量**:
   ```
   SITE_URL=https://your-site.netlify.app
   NODE_ENV=production
   DEPLOY_TARGET=static
   ```

### GitHub Pages

1. **启用 GitHub Actions**:
   - 项目已包含 `.github/workflows/ci.yml`
   - 自动构建和部署到 GitHub Pages

2. **配置 Repository Settings**:
   - Settings → Pages
   - Source: GitHub Actions

3. **环境变量** (Repository Secrets):
   ```
   SITE_URL=https://username.github.io/grow-a-garden-calculator
   ```

## 🔧 手动部署

### 构建静态文件

```bash
# 安装依赖
npm install

# 同步博客内容
npm run sync-blog

# 构建生产版本
DEPLOY_TARGET=static npm run build

# 导出静态文件
npm run export
```

### 服务器部署

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 📋 部署前检查清单

- [ ] 所有环境变量已设置
- [ ] 博客内容已同步
- [ ] 构建成功无错误
- [ ] 所有路由可访问
- [ ] SEO 元数据正确
- [ ] 图片和资源加载正常
- [ ] 移动端响应式正常

## 🌐 自定义域名

### Vercel

1. **添加域名**:
   - Project Settings → Domains
   - 添加您的域名

2. **DNS 配置**:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Netlify

1. **域名设置**:
   - Site Settings → Domain management
   - Add custom domain

2. **DNS 配置**:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

## 🔍 性能优化

### 图片优化
```javascript
// next.config.js
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
}
```

### 缓存策略
```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/_next/static/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ]
}
```

## 📊 监控和分析

### Google Analytics

1. **获取 GA4 ID**
2. **添加环境变量**:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### 性能监控

- **Vercel Analytics**: 自动启用
- **Google PageSpeed Insights**: 定期检查
- **Lighthouse**: 本地测试

## 🐛 常见问题

### 构建失败

**问题**: TypeScript 错误
**解决**: 运行 `npm run lint` 检查并修复错误

**问题**: 缺少依赖
**解决**: 删除 `node_modules` 和 `package-lock.json`，重新 `npm install`

### 部署后问题

**问题**: 404 错误
**解决**: 检查路由配置和 `trailingSlash` 设置

**问题**: 图片不显示
**解决**: 检查图片路径和 CDN 配置

### SEO 问题

**问题**: 元数据不正确
**解决**: 检查 `app/layout.tsx` 和页面级 metadata

**问题**: Sitemap 不更新
**解决**: 重新构建并部署

## 🔐 安全配置

### 环境变量安全

```bash
# 永远不要提交到 Git
.env.local
.env.production.local

# 使用平台的安全存储
# Vercel: Environment Variables
# Netlify: Environment Variables
# GitHub: Repository Secrets
```

### 安全头配置

项目已配置基本安全头：
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 📈 更新和维护

### 定期更新

```bash
# 更新依赖
npm update

# 检查安全漏洞
npm audit

# 同步博客内容
npm run sync-blog
```

### 监控网站状态

建议使用：
- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry
- **Performance monitoring**: Vercel Analytics

---

## 🆘 获取帮助

如果遇到部署问题：

1. **检查构建日志**
2. **查看平台文档**
3. **GitHub Issues**: 报告问题
4. **社区支持**: Vercel/Netlify 社区

祝您部署顺利！🚀 