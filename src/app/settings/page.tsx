"use client"
import { useEffect, useState } from 'react'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

type Model = { id: string; name: string }

const fallbackModels: Model[] = [
  { id: 'openrouter/auto', name: 'OpenRouter Auto (smart default)' },
  { id: 'openai/gpt-3.5-turbo', name: 'OpenAI GPT-3.5 Turbo' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Anthropic Claude 3.5 Sonnet' },
]

export default function SettingsPage() {
  const { state, dispatch } = useApp()
  const [apiKey, setApiKey] = useState(state.settings.openRouterApiKey)
  const [models, setModels] = useState<Model[]>(fallbackModels)
  const [selectedModel, setSelectedModel] = useState(state.settings.selectedModel)
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    async function loadModels() {
      if (!apiKey) return
      try {
        const res = await fetch('https://openrouter.ai/api/v1/models', {
          headers: { Authorization: `Bearer ${apiKey}` },
        })
        if (!res.ok) return
        const json = await res.json()
        const items: Model[] = json.data?.map((m: any) => ({ id: m.id, name: m.name || m.id }))
        if (items?.length) setModels(items)
      } catch {
        // ignore; keep fallback
      }
    }
    loadModels()
    // intentionally refresh when apiKey changes
  }, [apiKey])

  function save() {
    dispatch({ type: 'SET_SETTINGS', payload: { openRouterApiKey: apiKey, selectedModel } })
    setResult('Saved')
    setTimeout(() => setResult(null), 1500)
  }

  async function testConnection() {
    if (!apiKey) return setResult('Enter API key first')
    setTesting(true)
    setResult(null)
    try {
      const res = await fetch('https://openrouter.ai/api/v1/models', {
        headers: { Authorization: `Bearer ${apiKey}` },
      })
      setResult(res.ok ? 'Connection OK' : `Failed (${res.status})`)
    } catch (e) {
      setResult('Failed')
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="card">
      <h2>Settings</h2>
      <section style={{ marginTop: 12 }}>
        <h3>OpenRouter API</h3>
        <label htmlFor="key">API Key</label>
        <Input
          id="key"
          type="password"
          placeholder="sk-or-v1-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <div style={{ height: 12 }} />
        <label htmlFor="model">Model</label>
        <select
          id="model"
          className="input"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <div className="row" style={{ marginTop: 12, gap: 8 }}>
          <Button onClick={save}>Save</Button>
          <Button variant="secondary" onClick={testConnection} disabled={testing}>
            {testing ? 'Testing…' : 'Test Connection'}
          </Button>
        </div>
        {result && <div style={{ color: 'var(--muted)', marginTop: 12 }}>{result}</div>}
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>User Profile</h3>
        <p style={{ color: 'var(--muted)' }}>
          Profile info is provided by Google Sign-In and used only locally.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>App Preferences</h3>
        <p style={{ color: 'var(--muted)' }}>Theme selection is coming soon.</p>
      </section>
    </div>
  )
}

