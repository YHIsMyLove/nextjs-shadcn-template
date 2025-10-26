# CI/CD 和 GitHub Pages 部署指南

## 概述

本项目已配置完整的CI/CD流程，使用GitHub Actions自动构建和部署到GitHub Pages。

## 配置文件说明

### 1. GitHub Actions 工作流 (`.github/workflows/ci-cd.yml`)

```yaml
# 主要功能：
- 代码质量检查 (TypeScript, ESLint)
- 自动构建和测试
- 静态导出生成
- GitHub Pages 自动部署
```

**触发条件：**
- 推送到 `master` 或 `main` 分支
- 创建Pull Request

**部署条件：**
- 仅当推送到主分支时才部署到GitHub Pages

### 2. Next.js 配置 (`next.config.js`)

```javascript
// 静态导出配置
output: 'export',           // 静态导出模式
trailingSlash: true,        // 确保URL以/结尾
distDir: 'out',            // 输出目录
images: {
  unoptimized: true        // 禁用图像优化（静态托管需要）
},
basePath: '/nextjs-shadcn-template',     // GitHub子路径
assetPrefix: '/nextjs-shadcn-template'   // 资源前缀
```

## 本地测试

### 构建测试
```bash
# 安装依赖
pnpm install

# 构建项目
pnpm build

# 检查输出
ls -la out/
```

### 本地预览静态网站
```bash
# 安装serve工具
pnpm add -g serve

# 启动静态服务器
serve out -p 3000
```

## GitHub Pages 设置

### 1. 启用GitHub Pages
1. 进入GitHub仓库设置
2. 找到 "Pages" 选项
3. Source选择 "GitHub Actions"

### 2. 权限配置
GitHub Actions会自动配置必要的权限：
- `contents: read` - 读取仓库内容
- `pages: write` - 写入Pages
- `id-token: write` - OIDC认证

## 部署流程

### 自动部署流程
1. **代码推送** → 触发GitHub Actions
2. **环境设置** → Node.js 18 + 依赖安装
3. **代码检查** → TypeScript + ESLint
4. **项目构建** → `npm run build`
5. **静态导出** → 生成到 `out/` 目录
6. **部署Pages** → 上传并激活

### 手动触发部署
如果需要手动触发重新部署：
1. 进入GitHub仓库的Actions页面
2. 选择 "CI/CD Pipeline" 工作流
3. 点击 "Run workflow"

## 访问地址

- **生产环境**: https://yhisMyLove.github.io/nextjs-shadcn-template
- **本地开发**: http://localhost:3000

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 `package.json` 中的脚本是否正确
   - 确认Node.js版本兼容性

2. **部署失败**
   - 检查GitHub Pages权限设置
   - 确认工作流文件语法正确

3. **页面空白**
   - 检查 `basePath` 配置是否正确
   - 确认静态资源路径正确

4. **路由问题**
   - 确保使用 `next/link` 而不是原生 `<a>` 标签
   - 检查 `trailingSlash` 配置

### 调试步骤

1. 查看GitHub Actions日志
2. 本地运行构建命令检查错误
3. 使用 `npm run lint` 检查代码质量
4. 检查浏览器控制台错误信息

## 自定义配置

### 修改基础路径
如果仓库名称变更，需要修改：
- `next.config.js` 中的 `basePath` 和 `assetPrefix`
- GitHub Actions工作流中的路径配置

### 添加环境变量
1. 在仓库设置中添加Secrets
2. 在工作流中通过 `${{ secrets.VAR_NAME }}` 使用

### 自定义域名
1. 在GitHub Pages设置中添加自定义域名
2. 在仓库根目录创建 `CNAME` 文件
3. 更新 `next.config.js` 中的相关配置

## 最佳实践

1. **定期更新依赖** - 保持安全性和性能
2. **监控构建时间** - 优化工作流性能
3. **使用semantic commits** - 便于自动化版本管理
4. **测试本地构建** - 推送前确保构建成功
5. **监控部署状态** - 及时发现和解决问题