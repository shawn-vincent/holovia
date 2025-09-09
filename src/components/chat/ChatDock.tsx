"use client"
import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/Button'
import { useOpenRouter } from '@/hooks/useOpenRouter'
import { formatDateTime } from '@/utils/datetime'

export function ChatDock() {
  const { state, dispatch } = useApp()
  const { sendMessage } = useOpenRouter()
  const [input, setInput] = useState('')

  async function handleSend() {
    if (!input.trim()) return
    const userMsg = {
      id: crypto.randomUUID(),
      role: 'user' as const,
      content: input,
      timestamp: new Date().toISOString(),
    }
    dispatch({ type: 'ADD_MESSAGE', payload: userMsg })
    setInput('')
    await sendMessage(
      state.chatHistory.concat(userMsg).map((m) => ({ role: m.role, content: m.content }))
    )
  }

  function acceptSuggestion(idx: number) {
    const last = [...state.chatHistory].reverse().find((m) => m.activitySuggestions?.length)
    if (!last) return
    const sugg = last.activitySuggestions![idx]
    const now = new Date().toISOString()
    const activity = {
      id: crypto.randomUUID(),
      name: sugg.suggestedName,
      description: sugg.suggestedDescription,
      status: 'active' as const,
      createdAt: now,
      updatedAt: now,
      updates: [],
    }
    dispatch({ type: 'ADD_ACTIVITY', payload: activity })
  }

  return (
    <div className="chat-dock" role="complementary" aria-label="Chat">
      <div className="chat-inner">
        <div className="messages" aria-live="polite">
          {state.chatHistory.length === 0 && (
            <div className="msg system">Welcome to Holovia. How are you feeling today?</div>
          )}
          {state.uiState.error && (
            <div className="msg system" role="alert">{state.uiState.error}</div>
          )}
          {state.chatHistory.map((m) => (
            <div key={m.id} className={`msg ${m.role}`}>
              <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
                {formatDateTime(m.timestamp)}
              </div>
              {m.activitySuggestions?.length ? (
                <div className="suggestion">
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Suggested Activities</div>
                  {m.activitySuggestions.map((s, i) => (
                    <div key={i} style={{ marginBottom: 6 }}>
                      <div style={{ fontWeight: 600 }}>{s.suggestedName}</div>
                      <div style={{ color: 'var(--muted)' }}>{s.suggestedDescription}</div>
                      <div className="row" style={{ marginTop: 6, gap: 8 }}>
                        <Button onClick={() => acceptSuggestion(i)}>Accept</Button>
                        <Button variant="secondary">Dismiss</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          {state.uiState.isLoading && (
            <div className="msg system">Assistant is typing…</div>
          )}
        </div>
        <div className="row" style={{ gap: 8 }}>
          <input
            aria-label="Message"
            className="input"
            placeholder="Type a message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} disabled={state.uiState.isLoading}>
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
