# 快速启动指南

## 🚀 5分钟启动项目

### 1. 安装依赖
```bash
pnpm install
```

### 2. 配置OpenAI API
```bash
# 复制环境变量文件
cp .env.example .env.local

# 编辑.env.local，添加你的OpenAI API密钥
OPENAI_API_KEY=sk-your-api-key-here
```

### 3. 启动开发服务器
```bash
pnpm dev
```

### 4. 访问应用
打开浏览器访问 http://localhost:3000

## 🎯 测试功能

1. **页面展示** - 查看Hello World主页
2. **AI功能** - 输入主题，让AI生成故事开头
3. **UI组件** - 体验shadcn/ui组件的交互
4. **响应式** - 调整浏览器窗口大小测试

## 🛠️ 开发准备

### IDE推荐扩展 (VS Code)
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter

### 有用的命令
```bash
# 类型检查
pnpm type-check

# 代码格式化
pnpm format

# ESLint检查
pnpm lint
```

## 🔧 常见问题

### Q: OpenAI API调用失败？
A: 检查 `.env.local` 文件中的API密钥是否正确设置。

### Q: 样式不生效？
A: 确保已正确安装依赖并重启开发服务器。

### Q: TypeScript类型错误？
A: 运行 `pnpm type-check` 查看详细错误信息。

## 📚 下一步

- 阅读 [技术栈说明](./tech-stack.md)
- 查看 [开发指南](./development-guide.md)
- 了解 [项目README](../README.md)

## 🎉 开始开发

现在你可以开始基于这个脚手架开发你的应用了！

建议的开发顺序：
1. 修改页面内容和样式
2. 添加新的UI组件
3. 扩展API功能
4. 添加新的页面和路由