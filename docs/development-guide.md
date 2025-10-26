# 开发指南

## 环境准备

### 系统要求
- Node.js 18.0.0 或更高版本
- pnpm 8.0.0 或更高版本 (推荐)
- Git

### IDE推荐配置
- **VS Code**: 推荐安装以下扩展
  - TypeScript and JavaScript Language Features
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

## 项目初始化

### 1. 克隆或创建项目
```bash
# 如果是新项目
git init <project-name>
cd <project-name>

# 或克隆现有项目
git clone <repository-url>
cd <repository-name>
```

### 2. 安装依赖
```bash
pnpm install
```

### 3. 环境配置
```bash
# 复制环境变量文件
cp .env.example .env.local

# 编辑环境变量
OPENAI_API_KEY=your_actual_api_key
NEXT_PUBLIC_APP_NAME=Your App Name
```

## 开发流程

### 1. 启动开发服务器
```bash
pnpm dev
```
访问 http://localhost:3000

### 2. 代码规范检查
```bash
# 检查代码规范
pnpm lint

# 检查类型
pnpm type-check

# 格式化代码
pnpm format
```

### 3. 提交代码
```bash
# 添加文件
git add .

# 提交 (遵循约定式提交)
git commit -m "feat: add new feature"

# 推送到远程仓库
git push origin feature-branch
```

## 开发最佳实践

### 1. 组件开发
```typescript
// ✅ 好的组件写法
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MyComponentProps {
  className?: string
  title: string
  onSubmit?: () => void
}

export function MyComponent({ className, title, onSubmit }: MyComponentProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await onSubmit?.()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('p-4 border rounded-lg', className)}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? '处理中...' : '提交'}
      </Button>
    </div>
  )
}
```

### 2. API路由开发
```typescript
// src/app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { generateCompletion } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: '缺少必需的prompt参数' },
        { status: 400 }
      )
    }

    const result = await generateCompletion(prompt)

    return NextResponse.json({ result })
  } catch (error) {
    console.error('API错误:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}
```

### 3. 样式编写
```typescript
// 使用Tailwind CSS + shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function StyledComponent() {
  return (
    <Card className={cn(
      'w-full max-w-md mx-auto',
      'shadow-lg hover:shadow-xl',
      'transition-shadow duration-300'
    )}>
      <CardHeader>
        <CardTitle className="text-center">标题</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 内容 */}
      </CardContent>
    </Card>
  )
}
```

## 调试技巧

### 1. React组件调试
```typescript
import { useEffect } from 'react'

export function DebugComponent({ data }: { data: any }) {
  useEffect(() => {
    console.log('组件数据:', data)
  }, [data])

  return <div>检查控制台输出</div>
}
```

### 2. API调试
```typescript
// 在浏览器开发者工具的网络面板中查看API请求
// 在服务端控制台查看详细日志
export async function GET() {
  console.log('API调用开始:', new Date().toISOString())

  try {
    // 业务逻辑
    console.log('处理成功')
    return Response.json({ success: true })
  } catch (error) {
    console.error('API错误:', error)
    return Response.json({ error: '处理失败' }, { status: 500 })
  }
}
```

### 3. TypeScript调试
```typescript
// 使用类型断言和类型守卫
function processValue(value: unknown) {
  if (typeof value === 'string') {
    // TypeScript知道这里value是string类型
    return value.toUpperCase()
  }

  if (Array.isArray(value)) {
    // 这里value是unknown[]类型
    return value.length
  }

  throw new Error('不支持的数据类型')
}
```

## 性能优化

### 1. 代码分割
```typescript
// 动态导入组件
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>加载中...</div>,
  ssr: false
})
```

### 2. 图片优化
```typescript
import Image from 'next/image'

export function OptimizedImage() {
  return (
    <Image
      src="/example.jpg"
      alt="示例图片"
      width={500}
      height={300}
      priority
      className="rounded-lg"
    />
  )
}
```

### 3. 缓存策略
```typescript
// 使用React.memo优化组件渲染
import { memo } from 'react'

export const OptimizedComponent = memo(function Component({ data }: Props) {
  return <div>{data.name}</div>
})

// 使用useMemo缓存计算结果
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])
```

## 测试策略

### 1. 单元测试 (推荐Jest + React Testing Library)
```bash
# 安装测试依赖
pnpm add -D jest @testing-library/react @testing-library/jest-dom
```

### 2. 集成测试
```typescript
// 测试API路由
import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/test'

test('API返回正确响应', async () => {
  const { req, res } = createMocks({ method: 'GET' })

  await handler(req, res)

  expect(res._getStatusCode()).toBe(200)
  expect(JSON.parse(res._getData())).toEqual({ success: true })
})
```

## 部署准备

### 1. 构建检查
```bash
# 构建项目
pnpm build

# 检查构建产物
ls -la .next/
```

### 2. 环境变量检查
```bash
# 确保生产环境变量正确配置
echo $OPENAI_API_KEY
echo $NEXT_PUBLIC_APP_NAME
```

### 3. 性能测试
```bash
# 安装Lighthouse CLI
pnpm add -D @lhci/cli

# 运行性能测试
lhci autorun
```

## 故障排除

### 常见问题

1. **依赖安装失败**
   ```bash
   # 清除缓存重新安装
   pnpm store prune
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

2. **TypeScript类型错误**
   ```bash
   # 重新生成类型
   pnpm type-check
   ```

3. **样式不生效**
   ```bash
   # 检查Tailwind配置
   npx tailwindcss --help
   ```

4. **API调用失败**
   - 检查环境变量配置
   - 确认API密钥有效性
   - 查看服务器日志

## 资源链接

- [Next.js官方文档](https://nextjs.org/docs)
- [Tailwind CSS文档](https://tailwindcss.com/docs)
- [shadcn/ui组件库](https://ui.shadcn.com/)
- [OpenAI API文档](https://platform.openai.com/docs)
- [TypeScript手册](https://www.typescriptlang.org/docs/)