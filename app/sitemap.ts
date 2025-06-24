import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.grow-a-garden-calculator.org'
  
  // 获取所有博客文章
  const posts = getAllPosts()
  
  // 基础页面
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]
  
  // 添加博客文章页面
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [...routes, ...blogRoutes]
} 