import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Clock, Eye, User, Tag, ArrowLeft, Share2, BookOpen, TrendingUp } from 'lucide-react';
import { blogPosts, getRelatedPosts, getLatestPosts, blogTags } from '@/lib/blog-data';
import type { BlogPost } from '@/lib/blog-data';
import { BlogImage } from '@/components/blog-image';
import { ShareButtons } from '@/components/share-buttons';
import { QuickShare } from '@/components/quick-share';

// 生成静态路径
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 生成页面元数据
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found - Grow a Garden Calculator Blog',
      description: 'The requested grow a garden guide could not be found. Browse our comprehensive collection of farming strategies and calculator guides.',
    };
  }

  const baseUrl = 'https://www.grow-a-garden-calculator.org';
  const articleUrl = `${baseUrl}/blog/${post.slug}`;
  
  // 优化标题，确保包含关键词但不与其他页面重复
  const optimizedTitle = `${post.title} | Grow a Garden Calculator Guide 2025`;
  const optimizedDescription = `${post.excerpt} Expert grow a garden strategies and calculator tips for Roblox players.`;
  
  // 文章专用关键词
  const articleKeywords = [
    ...post.tags,
    'grow a garden guide',
    'roblox farming guide',
    'grow a garden strategy',
    'farming calculator guide',
    'grow a garden tips',
    'roblox calculator guide'
  ].join(', ');

  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: articleKeywords,
    canonical: articleUrl,
    authors: [{ name: post.author }],
    publishedTime: post.publishDate,
    modifiedTime: post.lastModified,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: articleUrl,
      siteName: 'Grow a Garden Calculator',
      locale: 'en_US',
      publishedTime: post.publishDate,
      modifiedTime: post.lastModified,
      authors: [post.author],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: post.featuredImage || `${baseUrl}/blog-og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage || `${baseUrl}/blog-twitter-image.png`],
      creator: '@GrowGardenCalc',
    },
    alternates: {
      canonical: articleUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  // 获取相关文章
  const relatedPosts = getRelatedPosts(post.id, post.tags, 3);
  
  // 获取最新文章
  const latestPosts = getLatestPosts(5);

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 分享数据
  const articleUrl = `https://www.grow-a-garden-calculator.org/blog/${post.slug}`;

  // 结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage || "https://www.grow-a-garden-calculator.org/blog-og-image.png",
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Grow a Garden Calculator",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.grow-a-garden-calculator.org/logo.png"
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.lastModified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.grow-a-garden-calculator.org/blog/${post.slug}`
    },
    "url": `https://www.grow-a-garden-calculator.org/blog/${post.slug}`,
    "keywords": post.tags.join(', '),
    "articleSection": post.category,
    "wordCount": post.content.split(' ').length,
    "timeRequired": `PT${post.readTime}M`,
    "about": {
      "@type": "Thing",
      "name": "Grow a Garden Roblox",
      "description": "A farming simulation game in Roblox"
    },
    "mentions": [
      {
        "@type": "VideoGame",
        "name": "Roblox Grow a Garden",
        "applicationCategory": "Game"
      }
    ],
    "isPartOf": {
      "@type": "Blog",
      "name": "Grow a Garden Calculator Blog",
      "url": "https://www.grow-a-garden-calculator.org/blog"
    }
  };

  // 渲染Markdown内容（改进版）
  const renderContent = (content: string) => {
    // 处理行内Markdown语法的函数
    const processInlineMarkdown = (text: string) => {
      // 处理粗体 **text**
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong className="font-semibold text-white">$1</strong>');
      
      // 处理斜体 *text*
      text = text.replace(/\*(.*?)\*/g, '<em className="italic text-slate-200">$1</em>');
      
      // 处理行内代码 `code`
      text = text.replace(/`([^`]+)`/g, '<code className="bg-slate-700 text-emerald-300 px-2 py-1 rounded text-sm">$1</code>');
      
      // 处理链接 [text](url)
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" className="text-emerald-400 hover:text-emerald-300 underline" target="_blank" rel="noopener noreferrer">$1</a>');
      
      return text;
    };

    return content.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
      // 标题处理
      if (line.startsWith('# ')) {
        // 将内容中的H1改为H2，确保页面只有一个H1标签
        return (
          <h2 
            key={index} 
            className="text-2xl font-bold text-white mb-6 mt-8 border-b border-slate-600 pb-2"
            dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line.slice(2)) }}
          />
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 
            key={index} 
            className="text-xl font-semibold text-white mb-4 mt-6"
            dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line.slice(3)) }}
          />
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h4 
            key={index} 
            className="text-lg font-semibold text-white mb-3 mt-5"
            dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line.slice(4)) }}
          />
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <h5 
            key={index} 
            className="text-base font-semibold text-white mb-2 mt-4"
            dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line.slice(5)) }}
          />
        );
      }
      
      // 列表项处理
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li 
            key={index} 
            className="text-slate-300 mb-1 ml-4 list-disc"
            dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line.slice(2)) }}
          />
        );
      }
      
      // 有序列表处理
      if (/^\d+\.\s/.test(line)) {
        const content = line.replace(/^\d+\.\s/, '');
        return (
          <li 
            key={index} 
            className="text-slate-300 mb-1 ml-4 list-decimal"
            dangerouslySetInnerHTML={{ __html: processInlineMarkdown(content) }}
          />
        );
      }
      
      // 引用块处理
      if (line.startsWith('> ')) {
        return (
          <blockquote 
            key={index} 
            className="border-l-4 border-emerald-500 pl-4 py-2 my-4 bg-slate-700/30 italic text-slate-300"
            dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line.slice(2)) }}
          />
        );
      }
      
      // 代码块处理（简单版）
      if (line.startsWith('```')) {
        return <div key={index} className="bg-slate-800 rounded p-4 my-4 font-mono text-emerald-300 text-sm overflow-x-auto">{line.slice(3)}</div>;
      }
      
      // 空行处理
      if (trimmedLine === '') {
        return <div key={index} className="h-4" />;
      }
      
      // 水平分割线
      if (trimmedLine === '---' || trimmedLine === '***') {
        return <hr key={index} className="border-slate-600 my-8" />;
      }
      
      // 普通段落处理
      return (
        <p 
          key={index} 
          className="text-slate-300 mb-3 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }}
        />
      );
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-6 bg-slate-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-700">
              <Link href="/" className="text-slate-300 font-medium hover:text-emerald-300 transition-colors">
                Calculator
              </Link>
              <Separator orientation="vertical" className="h-4 bg-slate-600" />
              <Link href="/blog" className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Blog & Guides
              </Link>
            </div>
          </div>

          {/* 返回按钮 */}
          <div className="mb-6">
            <Link href="/blog">
              <Button variant="ghost" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 主内容区 */}
            <div className="lg:col-span-3">
              <article>
                {/* 文章头部 */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-8">
                  <CardContent className="p-8">
                    {/* 分类标签 */}
                    <Badge className="bg-emerald-600 text-white mb-4">
                      {post.category}
                    </Badge>

                    {/* 标题 */}
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                      {post.title}
                    </h1>

                    {/* 摘要 */}
                    <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* 文章元信息 */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{post.views} views</span>
                      </div>
                    </div>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => {
                        const tagData = blogTags.find(t => t.name === tag);
                        return (
                          <Badge
                            key={tag}
                            variant="outline"
                            className={`${tagData?.color || 'bg-slate-500'} text-white border-none`}
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        );
                      })}
                    </div>

                    {/* 现代化分享按钮区域 */}
                    <div className="pt-6 border-t border-slate-700">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 text-sm font-medium">分享这篇文章:</span>
                          <div className="flex items-center gap-2">
                            <ShareButtons 
                              url={articleUrl}
                              title={post.title}
                              excerpt={post.excerpt}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 文章内容 */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-8">
                  <CardContent className="p-8">
                    <div className="prose prose-invert max-w-none">
                      {renderContent(post.content)}
                    </div>
                  </CardContent>
                </Card>

                {/* Related Articles - Always show with sample or real articles */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-400" />
                      Related Articles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {relatedPosts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPosts.map((relatedPost) => (
                          <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                            <Card className="bg-slate-700/40 border-slate-600 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer group h-full">
                              <CardContent className="p-4 flex flex-col h-full">
                                {/* Article cover image */}
                                <div className="w-full h-32 rounded-lg mb-3 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                  <BlogImage
                                    src={relatedPost.featuredImage} 
                                    alt={relatedPost.title}
                                    className="w-full h-full object-cover"
                                    fallbackClassName="w-full h-32"
                                  />
                                </div>

                                <div className="flex-1 flex flex-col">
                                  <h4 className="text-white font-semibold mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
                                    {relatedPost.title}
                                  </h4>
                                  <p className="text-slate-300 text-sm mb-3 flex-1 line-clamp-2">
                                    {relatedPost.excerpt}
                                  </p>
                                  <div className="flex items-center justify-between text-xs text-slate-400">
                                    <span>{formatDate(relatedPost.publishDate)}</span>
                                    <span>{relatedPost.readTime} min read</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Show other articles if no related posts */}
                        {latestPosts.filter(p => p.id !== post.id).slice(0, 3).map((otherPost) => (
                          <Link key={otherPost.id} href={`/blog/${otherPost.slug}`}>
                            <Card className="bg-slate-700/40 border-slate-600 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer group h-full">
                              <CardContent className="p-4 flex flex-col h-full">
                                {/* Article cover image */}
                                <div className="w-full h-32 rounded-lg mb-3 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                  <BlogImage
                                    src={otherPost.featuredImage}
                                    alt={otherPost.title}
                                    className="w-full h-full object-cover"
                                    fallbackClassName="w-full h-32"
                                  />
                                </div>

                                <div className="flex-1 flex flex-col">
                                  <h4 className="text-white font-semibold mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
                                    {otherPost.title}
                                  </h4>
                                  <p className="text-slate-300 text-sm mb-3 flex-1 line-clamp-2">
                                    {otherPost.excerpt}
                                  </p>
                                  <div className="flex items-center justify-between text-xs text-slate-400">
                                    <span>{formatDate(otherPost.publishDate)}</span>
                                    <span>{otherPost.readTime} min read</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Table of contents */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                    Table of Contents
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-2 text-sm">
                    {/* Dynamic article table of contents can be generated here */}
                    <div className="text-slate-300">
                      <p className="mb-3 font-medium">Quick navigation to article sections</p>
                      <div className="space-y-2">
                        <a href="#" className="block text-slate-200 hover:text-emerald-400 transition-colors py-1 px-2 rounded hover:bg-slate-700/50">
                          • Game Basics
                        </a>
                        <a href="#" className="block text-slate-200 hover:text-emerald-400 transition-colors py-1 px-2 rounded hover:bg-slate-700/50">
                          • Crop Rarity System
                        </a>
                        <a href="#" className="block text-slate-200 hover:text-emerald-400 transition-colors py-1 px-2 rounded hover:bg-slate-700/50">
                          • Mutation System Guide
                        </a>
                        <a href="#" className="block text-slate-200 hover:text-emerald-400 transition-colors py-1 px-2 rounded hover:bg-slate-700/50">
                          • Profit Strategies
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Latest articles */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Latest Articles
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-4">
                    {latestPosts.filter(p => p.id !== post.id).slice(0, 4).map((latestPost) => (
                      <Link key={latestPost.id} href={`/blog/${latestPost.slug}`}>
                        <div className="group cursor-pointer">
                          <h4 className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors mb-1 line-clamp-2">
                            {latestPost.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-300">
                            <Calendar className="w-3 h-3" />
                            {formatDate(latestPost.publishDate)}
                            <span>•</span>
                            <Eye className="w-3 h-3" />
                            {latestPost.views}
                          </div>
                        </div>
                        {latestPost !== latestPosts.filter(p => p.id !== post.id).slice(0, 4)[latestPosts.filter(p => p.id !== post.id).slice(0, 4).length - 1] && (
                          <Separator className="bg-slate-600 mt-4" />
                        )}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tag cloud */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Tag className="w-5 h-5 text-emerald-400" />
                    Related Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => {
                      const tagData = blogTags.find(t => t.name === tag);
                      return (
                        <Badge
                          key={tag}
                          className={`${tagData?.color || 'bg-slate-500'} text-white border-none`}
                        >
                          {tag}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Back to calculator */}
              <Card className="bg-gradient-to-br from-emerald-600/30 to-emerald-500/30 border-emerald-400/50 backdrop-blur-sm shadow-lg shadow-emerald-500/20">
                <CardContent className="p-6 text-center">
                  <div className="bg-emerald-600/20 rounded-lg p-4 mb-4">
                    <h3 className="text-white font-bold text-lg mb-2">Use Calculator</h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Apply strategies from this article and calculate your crop values instantly
                    </p>
                  </div>
                  <Link href="/">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                      Open Calculator
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 