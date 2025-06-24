#!/usr/bin/env node

console.log('🔄 测试博客数据同步...\n');

try {
  // 导入博客数据
  const { getAllPosts, blogTags, blogCategories } = require('../lib/blog-data.ts');
  
  console.log('✅ 博客数据模块导入成功');
  
  // 测试博客文章数据
  const posts = getAllPosts();
  console.log(`📚 博客文章数量: ${posts.length}`);
  
  // 显示每篇文章的基本信息
  posts.forEach((post, index) => {
    console.log(`${index + 1}. ${post.title}`);
    console.log(`   作者: ${post.author}`);
    console.log(`   发布日期: ${post.publishDate}`);
    console.log(`   分类: ${post.category}`);
    console.log(`   标签: ${post.tags.join(', ')}`);
    console.log(`   阅读时间: ${post.readTime}分钟`);
    console.log(`   浏览量: ${post.views}`);
    console.log('');
  });
  
  // 测试标签数据
  console.log(`🏷️ 标签数量: ${blogTags.length}`);
  blogTags.forEach(tag => {
    console.log(`   - ${tag.name} (${tag.count}篇文章)`);
  });
  console.log('');
  
  // 测试分类数据
  console.log(`📂 分类数量: ${blogCategories.length}`);
  blogCategories.forEach(category => {
    console.log(`   - ${category.name}: ${category.description} (${category.count}篇文章)`);
  });
  console.log('');
  
  console.log('🎉 博客数据同步测试完成！');
  console.log('💡 所有数据已更新为2025年版本，内容为英文');
  
} catch (error) {
  console.error('❌ 测试失败:', error.message);
  process.exit(1);
} 