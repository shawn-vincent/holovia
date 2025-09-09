"use client"
import { useApp } from '@/context/AppContext'
import { ActivityCard } from './ActivityCard'
import { Button } from '@/components/ui/Button'

export function ActivityList() {
  const { state, dispatch } = useApp()

  function addManualActivity() {
    const name = prompt('Activity name')?.trim()
    if (!name) return
    const description = prompt('Short description')?.trim() || ''
    const now = new Date().toISOString()
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        id: crypto.randomUUID(),
        name,
        description,
        status: 'active',
        createdAt: now,
        updatedAt: now,
        updates: [],
      },
    })
  }

  if (state.activities.length === 0) {
    return (
      <div className="card">
        <p style={{ color: 'var(--muted)' }}>
          No activities yet. Start a conversation below or create one manually.
        </p>
        <Button onClick={addManualActivity}>Create Activity</Button>
      </div>
    )
  }

  return (
    <div className="grid cols-2">
      {state.activities.map((a) => (
        <ActivityCard key={a.id} activity={a} />
      ))}
    </div>
  )
}

