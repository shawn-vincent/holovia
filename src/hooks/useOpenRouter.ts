"use client"
import { useCallback } from 'react'
import { useApp } from '@/context/AppContext'
import type { ChatMessage } from '@/types'

const SYSTEM_PROMPT = `You are a compassionate wellness assistant helping users track and improve their holistic health journey.\n\nGuidelines:\n- Ask permission before creating activities.\n- Encourage detailed, supportive conversation.\n- When suggesting an activity, include a single-line token:\n  ACTIVITY_SUGGESTION: {"name":"...","description":"..."}`

export function useOpenRouter() {
  const {
    state: { settings },
    dispatch,
  } = useApp()

  const sendMessage = useCallback(
    async (messages: { role: 'user' | 'assistant' | 'system'; content: string }[]) => {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      try {
        if (!settings.openRouterApiKey) {
          throw new Error('Please add your OpenRouter API key in Settings')
        }
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${settings.openRouterApiKey}`,
          },
          body: JSON.stringify({
            model: settings.selectedModel || 'openrouter/auto',
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
          }),
        })
        if (!res.ok) throw new Error(`OpenRouter error: ${res.status}`)
        const json = await res.json()
        const content: string = json.choices?.[0]?.message?.content ?? ''

        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content,
          timestamp: new Date().toISOString(),
          activitySuggestions: extractActivitySuggestions(content),
        }
        dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage })
        return assistantMessage
      } catch (e: any) {
        const msg = e?.message || 'Failed to contact OpenRouter'
        dispatch({ type: 'SET_ERROR', payload: msg })
        return null
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    [dispatch, settings.openRouterApiKey, settings.selectedModel]
  )

  return { sendMessage }
}

export function extractActivitySuggestions(text: string) {
  const suggestions: { suggestedName: string; suggestedDescription: string; accepted: boolean }[] = []
  const regex = /ACTIVITY_SUGGESTION:\s*(\{[^}]+\})/g
  let match
  while ((match = regex.exec(text))) {
    try {
      const obj = JSON.parse(match[1])
      if (obj.name && obj.description) {
        suggestions.push({
          suggestedName: String(obj.name),
          suggestedDescription: String(obj.description),
          accepted: false,
        })
      }
    } catch {}
  }
  return suggestions
}
