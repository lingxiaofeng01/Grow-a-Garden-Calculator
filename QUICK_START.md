# 博客内容同步系统 - 快速开始指南

## 🎉 恭喜！您的博客同步系统已成功配置

现在您可以通过简单的 Markdown 文件管理博客内容，无需手动编辑代码。

## 🚀 如何添加新文章

### 1. 创建 Markdown 文件
在 `content/blog/` 目录下创建新的 `.md` 文件：

```bash
content/blog/my-new-article.md
```

### 2. 添加 Front Matter
在文件开头添加元数据：

```yaml
---
title: "您的文章标题"
description: "文章摘要描述"
date: "2024-12-28"
author: "您的名字"
tags: ["标签1", "标签2", "标签3"]
category: "游戏指南"
featured: false
---
```

### 3. 编写文章内容
使用 Markdown 语法编写文章：

```markdown
# 文章标题

这里是文章内容...

## 子标题

- 列表项1
- 列表项2

### 代码示例
```javascript
function example() {
  return "Hello World";
}
```

### 4. 同步到博客系统
运行同步命令：

```bash
npm run sync-blog
```

### 5. 查看结果
重启开发服务器，访问博客页面查看新文章。

## 📋 常用命令

```bash
# 同步博客内容
npm run sync-blog

# 构建时自动同步
npm run build-with-blog

# 启动开发服务器
npm run dev
```

## 📚 更多信息

- 详细使用指南：`BLOG_SYNC_GUIDE.md`
- 文章模板：复制现有文章作为模板
- 问题反馈：查看控制台输出的错误信息

## 🎯 快速测试

1. 复制 `content/blog/2024-mutation-strategies.md` 
2. 重命名为 `test-article.md`
3. 修改 Front Matter 中的标题和内容
4. 运行 `npm run sync-blog`
5. 重启开发服务器查看效果

**就是这么简单！** 🎉

---

现在您可以专注于创作优质内容，而不用担心技术细节。祝您写作愉快！ 