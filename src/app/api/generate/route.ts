import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// 创建OpenAI客户端实例
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, options } = body

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: '请提供有效的输入内容' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: options?.model || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: options?.maxTokens || 1000,
      temperature: options?.temperature || 0.7,
    })

    const response = completion.choices[0]?.message?.content || '无法生成回复'

    return NextResponse.json({
      success: true,
      data: response
    })

  } catch (error) {
    console.error('OpenAI API调用失败:', error)

    // 根据错误类型返回不同的错误信息
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'API密钥配置错误，请检查环境变量' },
          { status: 500 }
        )
      }
      if (error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'API配额已用完，请检查账户余额' },
          { status: 429 }
        )
      }
    }

    return NextResponse.json(
      { error: 'AI服务暂时不可用，请稍后再试' },
      { status: 500 }
    )
  }
}