'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, Clock, Eye, User, Tag, BookOpen, TrendingUp, Star } from 'lucide-react';

// 使用同步后的博客数据
import { 
  getAllPosts, 
  getLatestPosts, 
  blogCategories,
  type BlogPost 
} from '@/lib/blog-data';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // 使用真实的同步数据
      const realPosts = getAllPosts();
      setPosts(realPosts);
      
      // Extract categories and tags from real data
      const uniqueCategories = Array.from(new Set(blogCategories.map(cat => cat.name)));
      
      setCategories(uniqueCategories);
      
      setLoading(false);
      
      // 在开发环境中记录调试信息
      if (process.env.NODE_ENV === 'development') {
        console.log('Blog data loaded successfully:', {
          posts: realPosts.length,
          categories: uniqueCategories.length
        });
      }
    } catch (error) {
      console.error('Failed to load blog data:', error);
      setLoading(false);
    }
  }, []);

  // 获取最新文章用于侧边栏
  const latestPosts = useMemo(() => {
    try {
      return getLatestPosts(5);
    } catch (error) {
      console.error('Failed to get latest posts:', error);
      return [];
    }
  }, []);

  // 过滤文章
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
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

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <BookOpen className="text-emerald-400" />
            Grow a Garden Blog & Expert Guides
          </h1>
          <p className="text-slate-300 text-lg lg:text-xl mb-6">
            Professional grow a garden guides, farming strategies, and expert tips for Roblox players. 
            Discover advanced techniques, crop optimization guides, and latest game updates from grow a garden experts.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <Badge variant="outline" className="text-emerald-400 border-emerald-400">
              Expert Grow a Garden Guides
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              Farming Strategies
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              Crop Optimization Tips
            </Badge>
            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
              Latest Game Updates
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Search and filters */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Search box */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search grow a garden guides and farming strategies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500"
                    />
                  </div>

                  {/* Category filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-emerald-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="All" className="text-white hover:bg-slate-600">
                        All Categories
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white hover:bg-slate-600">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Activity filter display */}
                {(selectedCategory !== 'All' || searchTerm !== '') && (
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-600">
                    <span className="text-slate-400 text-sm">Active filters:</span>
                    {searchTerm && (
                      <Badge variant="secondary" className="bg-emerald-900/30 text-emerald-300">
                        Search: {searchTerm}
                      </Badge>
                    )}
                    {selectedCategory !== 'All' && (
                      <Badge variant="secondary" className="bg-blue-900/30 text-blue-300">
                        Category: {selectedCategory}
                      </Badge>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('All');
                      }}
                      className="text-slate-400 hover:text-white h-6"
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Article list */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Grow a Garden Guides & Articles ({filteredPosts.length})
                </h2>
              </div>

              {filteredPosts.length === 0 ? (
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-12 text-center">
                    <Search className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-300 mb-2">No grow a garden guides found</h3>
                    <p className="text-slate-400">
                      Try adjusting your search criteria or clear the filters to browse all grow a garden guides
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer group h-full">
                        <CardContent className="p-6 flex flex-col h-full">
                          {/* Article cover image */}
                          <div className="w-full h-48 rounded-lg mb-4 overflow-hidden relative">
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                // If image fails to load, display placeholder
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                            {/* Placeholder, only show if image fails to load */}
                            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 absolute inset-0 flex items-center justify-center group-hover:from-emerald-900/20 group-hover:to-slate-800 transition-all duration-300" style={{display: 'none'}}>
                              <div className="text-center">
                                <BookOpen className="w-12 h-12 text-slate-500 group-hover:text-emerald-400 transition-colors mx-auto mb-2" />
                                <p className="text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">
                                  {post.category}
                                </p>
                              </div>
                            </div>
                            {/* Category tag overlay */}
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-black/60 text-white border-none backdrop-blur-sm">
                                {post.category}
                              </Badge>
                            </div>
                          </div>

                          {/* Article content */}
                          <div className="flex-1 flex flex-col">
                            {/* Title */}
                            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-300 transition-colors line-clamp-2">
                              {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-slate-400 text-sm mb-4 flex-1 line-clamp-3">
                              {post.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs bg-slate-700 text-white border-slate-600"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs text-slate-400 border-slate-600">
                                  +{post.tags.length - 3}
                                </Badge>
                              )}
                            </div>

                            {/* Article metadata */}
                            <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-700">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {post.author}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(post.publishDate)}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {post.readTime} min
                                </span>
                                {post.featured && (
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Latest articles */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Latest Grow a Garden Guides
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  {latestPosts.map((post, index) => (
                    <div key={post.slug}>
                      <Link href={`/blog/${post.slug}`}>
                        <div className="group cursor-pointer">
                          <h4 className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors mb-1 line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.publishDate)}
                          </div>
                        </div>
                      </Link>
                      {index < latestPosts.length - 1 && (
                        <Separator className="bg-slate-700 mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category navigation */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  Grow a Garden Guide Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-3">
                  {blogCategories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(selectedCategory === category.name ? 'All' : category.name)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                        selectedCategory === category.name
                          ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-300'
                          : 'border-slate-600/50 hover:bg-slate-700/30 hover:border-slate-500 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <p className="text-xs text-slate-400 mt-1">
                            {category.description}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 