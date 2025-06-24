import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from './blog-data';

// 内容目录路径
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

// 从文件名生成 slug
function generateSlug(filename: string): string {
  return filename.replace(/\.md$/, '').toLowerCase();
}

// 估算阅读时间（基于字数，中文按字符计算，英文按单词计算）
function estimateReadTime(content: string): number {
  // 移除 markdown 语法
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // 代码块
    .replace(/`[^`]*`/g, '') // 行内代码
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // 链接
    .replace(/[#*_~]/g, '') // markdown 标记
    .replace(/\s+/g, ' ') // 多余空格
    .trim();

  // 中文字符数
  const chineseChars = (plainText.match(/[\u4e00-\u9fff]/g) || []).length;
  // 英文单词数
  const englishWords = plainText.replace(/[\u4e00-\u9fff]/g, '').split(/\s+/).filter(word => word.length > 0).length;
  
  // 中文：300字/分钟，英文：200词/分钟
  const readTime = Math.ceil((chineseChars / 300) + (englishWords / 200));
  return Math.max(1, readTime); // 至少1分钟
}

// 从 Front Matter 解析博客文章
function parseBlogPost(filename: string, fileContent: string): BlogPost {
  const { data, content } = matter(fileContent);
  const slug = generateSlug(filename);
  
  // 生成唯一 ID（基于文件名）
  const id = slug.replace(/-/g, '');
  
  // 解析日期
  const publishDate = data.date || new Date().toISOString().split('T')[0];
  const lastModified = data.lastModified || publishDate;
  
  // 处理标签
  const tags = Array.isArray(data.tags) ? data.tags : 
               typeof data.tags === 'string' ? data.tags.split(',').map(tag => tag.trim()) : 
               [];
  
  // 生成摘要（如果没有提供）
  let excerpt = data.description || data.excerpt || '';
  if (!excerpt) {
    // 从内容中提取前150个字符作为摘要
    const plainContent = content.replace(/[#*_~`]/g, '').replace(/\s+/g, ' ').trim();
    excerpt = plainContent.substring(0, 150) + (plainContent.length > 150 ? '...' : '');
  }
  
  return {
    id,
    title: data.title || filename.replace(/\.md$/, ''),
    slug,
    excerpt,
    content,
    author: data.author || 'Garden Expert',
    publishDate,
    lastModified,
    featuredImage: data.cover || data.featuredImage || `/blog/images/covers/${slug}.jpg`,
    tags,
    category: data.category || '游戏指南',
    readTime: data.readTime ? parseInt(data.readTime) : estimateReadTime(content),
    featured: data.featured === true,
    views: data.views || Math.floor(Math.random() * 1000) + 100 // 随机初始浏览量
  };
}

// 同步博客内容
export async function syncBlogContent(): Promise<BlogPost[]> {
  try {
    // 检查内容目录是否存在
    if (!fs.existsSync(CONTENT_DIR)) {
      console.warn(`博客内容目录不存在: ${CONTENT_DIR}`);
      return [];
    }

    // 读取所有 markdown 文件
    const files = fs.readdirSync(CONTENT_DIR)
      .filter(file => file.endsWith('.md'))
      .sort();

    const posts: BlogPost[] = [];

    for (const file of files) {
      try {
        const filePath = path.join(CONTENT_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const post = parseBlogPost(file, fileContent);
        posts.push(post);
        console.log(`✅ 已同步文章: ${post.title}`);
      } catch (error) {
        console.error(`❌ 解析文章失败 ${file}:`, error);
      }
    }

    // 按发布日期排序（最新的在前）
    posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    console.log(`🎉 博客内容同步完成，共 ${posts.length} 篇文章`);
    return posts;
  } catch (error) {
    console.error('❌ 博客内容同步失败:', error);
    return [];
  }
}

// 生成博客数据文件
export async function generateBlogData(): Promise<void> {
  const posts = await syncBlogContent();
  
  if (posts.length === 0) {
    console.warn('⚠️ 没有找到博客文章，跳过生成');
    return;
  }

  // 生成标签统计
  const tagCount: { [key: string]: number } = {};
  const categoryCount: { [key: string]: number } = {};
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
    categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
  });

  // 生成标签数据
  const tags = Object.entries(tagCount).map(([name, count]) => ({
    name,
    count,
    color: getTagColor(name) // 根据标签名生成颜色
  }));

  // 生成分类数据
  const categories = Object.entries(categoryCount).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    description: getCategoryDescription(name),
    count
  }));

  // 生成新的博客数据文件内容
  const blogDataContent = `// 此文件由博客同步工具自动生成，请勿手动编辑
// 生成时间: ${new Date().toLocaleString('zh-CN')}

// 博客文章类型定义
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  lastModified: string;
  featuredImage: string;
  tags: string[];
  category: string;
  readTime: number; // 预估阅读时间（分钟）
  featured: boolean; // 是否为精选文章
  views: number; // 浏览量
}

// 标签数据类型
export interface BlogTag {
  name: string;
  count: number;
  color: string;
}

// 博客分类
export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
  count: number;
}

// 博客文章数据（从 Markdown 文件同步）
export const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};

// 标签数据
export const blogTags: BlogTag[] = ${JSON.stringify(tags, null, 2)};

// 分类数据
export const blogCategories: BlogCategory[] = ${JSON.stringify(categories, null, 2)};

// 获取所有文章
export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

// 根据 slug 获取文章
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// 获取相关文章
export function getRelatedPosts(currentPostId: string, tags: string[], limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.id !== currentPostId)
    .map(post => ({
      ...post,
      relevanceScore: post.tags.filter(tag => tags.includes(tag)).length
    }))
    .filter(post => post.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
}

// 获取最新文章
export function getLatestPosts(limit: number = 5): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
}

// 获取精选文章
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

// 根据分类获取文章
export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

// 根据标签获取文章
export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}

// 搜索文章
export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.category.toLowerCase().includes(lowercaseQuery)
  );
}
`;

  // 写入文件
  const outputPath = path.join(process.cwd(), 'lib', 'blog-data.ts');
  fs.writeFileSync(outputPath, blogDataContent, 'utf-8');
  
  console.log(`✅ 博客数据文件已生成: ${outputPath}`);
  console.log(`📊 统计信息:`);
  console.log(`   - 文章数量: ${posts.length}`);
  console.log(`   - 标签数量: ${tags.length}`);
  console.log(`   - 分类数量: ${categories.length}`);
}

// 根据标签名生成颜色
function getTagColor(tagName: string): string {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-red-100 text-red-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
    'bg-gray-100 text-gray-800'
  ];
  
  // 基于标签名的哈希值选择颜色
  let hash = 0;
  for (let i = 0; i < tagName.length; i++) {
    hash = ((hash << 5) - hash + tagName.charCodeAt(i)) & 0xffffffff;
  }
  return colors[Math.abs(hash) % colors.length];
}

// 获取分类描述
function getCategoryDescription(category: string): string {
  const descriptions: { [key: string]: string } = {
    '游戏指南': '基础游戏机制和新手指导',
    '进阶攻略': '高级策略和优化技巧',
    '技术分析': '深度数据分析和计算',
    '游戏资讯': '最新更新和版本信息',
    '深度分析': '经济学和投资策略分析',
    'comprehensive guides': '全面的游戏指南和教程',
    'strategy guides': '策略指导和优化建议',
    'game mechanics': '游戏机制详解',
    'updates': '游戏更新和新闻'
  };
  
  return descriptions[category] || '相关游戏内容和攻略';
} 