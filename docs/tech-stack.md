# 技术栈详细说明

## 核心框架

### Next.js 14+
- **版本**: 14.2.5
- **特性**: App Router、Server Components、Turbopack
- **用途**: 全栈React框架，提供SSR、SSG、API路由等功能

### React 18+
- **版本**: 18.3.1
- **特性**: 并发特性、Suspense、Hooks
- **用途**: 用户界面构建

### TypeScript
- **版本**: 5.5.4
- **特性**: 严格模式、路径映射、类型推断
- **用途**: 类型安全的JavaScript超集

## UI和样式

### Tailwind CSS
- **版本**: 3.4.6
- **特性**: 原子化CSS、响应式设计、深色模式
- **配置**: 自定义主题、颜色变量、动画

### shadcn/ui
- **特性**: 基于Radix UI的无头组件
- **组件**: Button、Card、Input、Dialog等
- **定制**: 支持主题定制和CSS变量

### 样式架构
- **全局样式**: globals.css
- **组件样式**: Tailwind类名 + CSS变量
- **主题**: 支持亮色/深色模式切换

## AI集成

### OpenAI SDK
- **版本**: 4.52.7
- **API**: Chat Completions
- **用途**: 文本生成、对话、创作辅助

### 配置说明
- 环境变量配置
- 错误处理和重试机制
- 类型安全的API封装

## 开发工具

### ESLint
- **配置**: Next.js推荐配置
- **规则**: TypeScript严格模式、React最佳实践

### Prettier
- **配置**: 单引号、无分号、2空格缩进
- **集成**: 与ESLint配合使用

### 路径映射
```typescript
"@/*": ["./src/*"],
"@/components/*": ["./src/components/*"],
"@/lib/*": ["./src/lib/*"],
"@/app/*": ["./src/app/*"]
```

## 构建和部署

### 开发环境
- **命令**: `pnpm dev`
- **热重载**: 支持Fast Refresh
- **端口**: 3000 (默认)

### 生产构建
- **命令**: `pnpm build`
- **输出**: 静态文件和Node.js服务端
- **优化**: 代码分割、图片优化、压缩

### 依赖管理
- **工具**: pnpm (推荐)
- **版本锁定**: package.json
- **引擎要求**: Node.js 18+

## 可选集成 (未实现)

### Vite集成
- **状态**: 计划中
- **优势**: 更快的开发服务器、更好的构建性能
- **挑战**: 与Next.js生态系统的兼容性

### Tauri桌面应用
- **状态**: 预留配置
- **技术**: Rust后端 + Web前端
- **用途**: 跨平台桌面应用开发

## 代码规范

### 命名约定
- **组件**: PascalCase (UserProfile.tsx)
- **文件**: camelCase (userService.ts)
- **常量**: UPPER_SNAKE_CASE (API_BASE_URL)

### 文件组织
- **页面**: src/app/
- **组件**: src/components/
- **工具**: src/lib/
- **类型**: 与文件同名的types文件

### Git规范
- **分支**: feature/xxx, bugfix/xxx
- **提交**: feat: xxx, fix: xxx, docs: xxx
- **标签**: v1.0.0格式