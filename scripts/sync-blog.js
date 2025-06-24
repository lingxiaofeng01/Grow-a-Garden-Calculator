#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 开始同步博客内容...\n');

try {
  // 编译 TypeScript 同步工具
  console.log('📦 编译同步工具...');
  execSync('npx tsc lib/blog-sync.ts --outDir scripts/temp --target es2020 --module commonjs --moduleResolution node --esModuleInterop true --allowSyntheticDefaultImports true --skipLibCheck true', {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  // 运行同步工具
  console.log('🔄 执行博客内容同步...');
  const { generateBlogData } = require('./temp/blog-sync.js');
  
  generateBlogData().then(() => {
    console.log('\n✅ 博客内容同步完成！');
    console.log('💡 提示: 重启开发服务器以查看更新后的内容');
    
    // 清理临时文件
    const fs = require('fs');
    const tempDir = path.join(__dirname, 'temp');
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }).catch(error => {
    console.error('❌ 同步失败:', error);
    process.exit(1);
  });

} catch (error) {
  console.error('❌ 编译失败:', error.message);
  process.exit(1);
} 