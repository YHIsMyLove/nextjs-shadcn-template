# Next.js + shadcn/ui 模板项目

一个基于现代化技术栈的Next.js模板项目，集成React、shadcn/ui、Tailwind CSS和TypeScript，提供开箱即用的开发体验。

## 🚀 技术栈

- **框架**: Next.js 14+ (App Router)
- **UI库**: React 18+
- **样式**: Tailwind CSS + shadcn/ui
- **类型检查**: TypeScript
- **AI集成**: OpenAI API (可选)
- **构建工具**: Turbopack (Next.js内置)
- **代码格式化**: Prettier + ESLint

## 📦 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 环境配置 (可选)

如果需要使用AI功能，可以复制环境变量示例文件：

```bash
cp .env.example .env.local
```

在 `.env.local` 文件中配置你的OpenAI API密钥：

```
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. 启动开发服务器

```bash
pnpm dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动。

## 🛠️ 可用脚本

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm start` - 启动生产服务器
- `pnpm lint` - 运行ESLint检查
- `pnpm type-check` - 运行TypeScript类型检查
- `pnpm format` - 格式化代码
- `pnpm format:check` - 检查代码格式

## 📁 项目结构

```
nextjs-shadcn-template/
├── src/
│   ├── app/              # Next.js App Router页面
│   │   ├── layout.tsx    # 根布局
│   │   └── page.tsx      # 主页 (Hello World)
│   ├── components/       # React组件
│   │   └── ui/           # shadcn/ui组件
│   ├── lib/              # 工具函数和配置
│   │   ├── utils.ts      # 通用工具函数
│   └── styles/           # 样式文件
│       └── globals.css   # 全局样式
├── docs/                 # 项目文档
├── public/               # 静态资源
└── 配置文件...
```

## ✨ 主要特性

- 🎯 **零配置TypeScript** - 开箱即用的类型安全
- 🎨 **现代化UI组件** - 基于shadcn/ui的美观界面
- 📱 **响应式设计** - 适配各种屏幕尺寸
- ⚡ **快速开发** - 集成Turbopack开发服务器
- 🔧 **开发者友好** - 完整的开发工具链

## 🔧 配置说明

### shadcn/ui配置
项目已预配置shadcn/ui，配置文件位于 `components.json`。

### Tailwind CSS配置
使用自定义主题和颜色变量，配置文件位于 `tailwind.config.ts`。

### TypeScript配置
支持绝对路径导入和严格模式，配置文件位于 `tsconfig.json`。

## 🚀 部署

### Vercel部署
1. 推送代码到GitHub
2. 在Vercel中导入项目
3. 配置环境变量 `OPENAI_API_KEY`

### 其他平台
```bash
pnpm build
```
构建完成后，将 `.next` 目录部署到任意支持Node.js的平台。

## 📚 扩展开发

### 添加新的shadcn/ui组件
```bash
npx shadcn-ui@latest add [component-name]
```

### 添加新的页面
在 `src/app` 目录下创建新的文件，遵循Next.js App Router约定。

### API路由
在 `src/app/api` 目录下创建API路由文件。

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个脚手架！

## 📄 许可证

MIT License

## 🔮 扩展建议

- [ ] 添加更多shadcn/ui组件示例
- [ ] 集成状态管理库 (Zustand/Jotai)
- [ ] 添加用户认证系统
- [ ] 集成数据库 (Prisma/Supabase)
- [ ] 添加国际化支持