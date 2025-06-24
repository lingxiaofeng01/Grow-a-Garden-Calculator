# Contributing to Grow a Garden Calculator

感谢您对 Grow a Garden Calculator 项目的兴趣！我们欢迎所有形式的贡献。

## 🚀 快速开始

### 开发环境设置

1. **Fork 这个仓库**
2. **克隆您的 fork**:
   ```bash
   git clone https://github.com/your-username/grow-a-garden-calculator.git
   cd grow-a-garden-calculator
   ```

3. **安装依赖**:
   ```bash
   npm install
   ```

4. **启动开发服务器**:
   ```bash
   npm run dev
   ```

5. **创建功能分支**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 贡献类型

我们欢迎以下类型的贡献：

### 🐛 Bug 修复
- 修复计算器中的数学错误
- 解决 UI/UX 问题
- 修复响应式设计问题
- 性能优化

### ✨ 新功能
- 新的作物数据
- 改进的计算功能
- 新的 UI 组件
- SEO 优化
- 博客文章

### 📚 文档改进
- README 更新
- 代码注释
- API 文档
- 用户指南

### 🎨 设计改进
- UI/UX 设计
- 响应式设计
- 无障碍性改进
- 主题和样式

## 🔧 开发指南

### 代码风格
- 使用 TypeScript
- 遵循 ESLint 配置
- 使用 Prettier 格式化代码
- 保持一致的命名约定

### 提交信息格式
使用语义化提交信息：

```
type(scope): description

例如:
feat(calculator): add mutation calculator
fix(ui): correct button alignment
docs(readme): update installation guide
style(components): improve responsive design
```

### 测试
- 确保所有现有测试通过
- 为新功能编写测试
- 测试响应式设计
- 验证 SEO 元数据

## 📝 提交 Pull Request

1. **确保您的代码遵循项目标准**:
   ```bash
   npm run lint
   npm run build
   ```

2. **提交您的更改**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

3. **创建 Pull Request**:
   - 提供清晰的标题和描述
   - 说明您的更改解决了什么问题
   - 包含截图（如果涉及 UI 更改）
   - 引用相关的 issue

## 🎯 优先级贡献

当前我们特别欢迎以下贡献：

### 高优先级
- **新作物数据**: 添加缺失的作物信息
- **计算精度**: 改进数学计算的准确性
- **性能优化**: 提高应用程序性能
- **移动端优化**: 改善移动设备体验

### 中等优先级
- **博客内容**: 添加游戏策略和技巧文章
- **UI 改进**: 提升用户界面设计
- **国际化**: 添加多语言支持
- **PWA 功能**: 渐进式 Web 应用功能

### 长期目标
- **实时数据**: 与游戏 API 集成
- **用户系统**: 用户账户和保存功能
- **社区功能**: 用户评论和评分
- **高级分析**: 详细的统计和图表

## 🐛 报告 Bug

如果您发现 bug，请创建一个 issue 并包含：

1. **描述**: 清楚地描述问题
2. **重现步骤**: 详细的重现步骤
3. **预期行为**: 描述预期的结果
4. **实际行为**: 描述实际发生的情况
5. **环境信息**: 浏览器、操作系统、设备等
6. **截图**: 如果有助于说明问题

## 💡 功能请求

对于新功能建议，请创建一个 issue 并包含：

1. **功能描述**: 详细说明建议的功能
2. **使用场景**: 解释为什么需要这个功能
3. **实现建议**: 如果有，提供实现思路
4. **优先级**: 说明功能的重要性

## 📊 项目结构

```
grow-a-garden-calculator/
├── app/                    # Next.js 13 App Router
│   ├── blog/              # 博客页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # React 组件
│   └── ui/               # UI 组件库
├── lib/                  # 工具函数和数据
├── public/               # 静态资源
├── scripts/              # 构建脚本
└── README.md
```

## 🔍 代码审查流程

1. **自动检查**: CI/CD 流水线自动运行
2. **代码审查**: 维护者审查代码质量
3. **功能测试**: 验证功能是否正常工作
4. **合并**: 审查通过后合并到主分支

## 📞 联系方式

如果您有任何问题或需要帮助：

- **GitHub Issues**: 技术问题和 bug 报告
- **Discussions**: 功能讨论和一般问题
- **Email**: 私人或敏感问题

## 🎉 致谢

感谢所有为这个项目做出贡献的开发者！

---

**开始贡献很简单！**选择一个您感兴趣的问题或功能，fork 仓库，然后开始编码吧！🚀 