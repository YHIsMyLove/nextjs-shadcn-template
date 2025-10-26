# CI/CD 修复说明

## 问题描述
GitHub Actions 流水线失败，错误信息：
```
Dependencies lock file is not found in /home/runner/work/nextjs-shadcn-template/nextjs-shadcn-template. Supported file patterns: package-lock.json,npm-shrinkwrap.json,yarn.lock
```

## 问题原因
项目使用 pnpm 作为包管理工具，生成了 `pnpm-lock.yaml` 锁定文件，但 GitHub Actions 配置文件中配置的是 npm，导致 CI/CD 系统无法识别依赖锁定文件。

## 修复内容

### 1. 更新 GitHub Actions 配置文件
文件位置：`.github/workflows/ci-cd.yml`

#### 主要修改：
- 添加 pnpm setup 步骤
- 配置 pnpm 缓存
- 将所有 `npm ci` 命令改为 `pnpm install --frozen-lockfile`
- 将所有 `npm run` 命令改为 `pnpm run`

#### 具体变更：

**build-and-test job：**
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: ${{ env.NODE_VERSION }}

- name: Setup pnpm
  uses: pnpm/action-setup@v3
  with:
    version: 8
    run_install: false

- name: Get pnpm store directory
  shell: bash
  run: |
    echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

- name: Setup pnpm cache
  uses: actions/cache@v4
  with:
    path: ${{ env.STORE_PATH }}
    key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-pnpm-store-

- name: Install dependencies
  run: pnpm install --frozen-lockfile
```

**deploy job：** 同样的配置更新

### 2. 验证 Next.js 配置
确认 `next.config.js` 中的静态导出配置正确：
- `output: 'export'`
- `distDir: 'out'`
- `trailingSlash: true`
- 生产环境的 `basePath` 和 `assetPrefix` 配置

## 修复后的优势

1. **更快的安装速度**：pnpm 的依赖安装比 npm 更快
2. **更好的缓存利用**：通过 pnpm store 缓存提高 CI/CD 效率
3. **更小的存储占用**：pnpm 使用硬链接机制，节省磁盘空间
4. **更严格的依赖管理**：`--frozen-lockfile` 确保依赖版本一致性

## 后续建议

1. 确保开发团队统一使用 pnpm 作为包管理工具
2. 在项目 README 中添加 pnpm 安装和使用说明
3. 考虑添加 `.npmrc` 配置文件，统一项目配置

## 验证方法

推送代码到 GitHub 后，检查 Actions 页面中的流水线执行情况：
- build-and-test job 应该成功执行
- deploy job 应该成功部署到 GitHub Pages
- 所有步骤（依赖安装、类型检查、代码检查、构建）都应该正常通过