import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, recommendations } = body

    if (!answers || !recommendations) {
      return NextResponse.json(
        { error: 'Missing required fields: answers and recommendations' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Skip gracefully if Supabase env vars are not configured
    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase environment variables not set — skipping survey submission.')
      return NextResponse.json({ success: true, skipped: true })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from('survey_responses').insert([
      {
        answers,
        recommendations,
      },
    ])

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save response', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Unexpected error in /api/submit:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
