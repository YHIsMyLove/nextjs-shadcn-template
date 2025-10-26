// API 调用的配置选项
export interface GenerationOptions {
  model?: string
  maxTokens?: number
  temperature?: number
}

// API 响应类型
export interface GenerationResponse {
  success: boolean
  data?: string
  error?: string
}

// 调用本地 API 的函数
export async function generateCompletion(
  prompt: string,
  options?: GenerationOptions
): Promise<string> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        options: {
          model: options?.model || 'gpt-3.5-turbo',
          maxTokens: options?.maxTokens || 1000,
          temperature: options?.temperature || 0.7,
        },
      }),
    })

    const data: GenerationResponse = await response.json()

    if (data.success && data.data) {
      return data.data
    } else {
      throw new Error(data.error || '生成失败')
    }
  } catch (error) {
    console.error('API调用失败:', error)
    throw new Error(
      error instanceof Error ? error.message : 'AI服务暂时不可用，请稍后再试'
    )
  }
}

// 环境变量类型定义
export interface EnvConfig {
  OPENAI_API_KEY: string
  NEXT_PUBLIC_APP_NAME?: string
}