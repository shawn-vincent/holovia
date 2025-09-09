"use client"
import { Activity } from '@/types'
import { Button } from '@/components/ui/Button'
import { formatDateTime } from '@/utils/datetime'
import { useApp } from '@/context/AppContext'

export function ActivityCard({ activity }: { activity: Activity }) {
  const { dispatch } = useApp()

  function changeStatus(status: Activity['status']) {
    const updated: Activity = { ...activity, status, updatedAt: new Date().toISOString() }
    dispatch({ type: 'UPDATE_ACTIVITY', payload: updated })
  }

  function addUpdate() {
    const content = prompt('Add a quick update')
    if (!content) return
    const updated: Activity = {
      ...activity,
      updates: [
        {
          id: crypto.randomUUID(),
          content,
          timestamp: new Date().toISOString(),
          source: 'direct',
        },
        ...activity.updates,
      ],
      updatedAt: new Date().toISOString(),
    }
    dispatch({ type: 'UPDATE_ACTIVITY', payload: updated })
  }

  return (
    <div className="card" aria-label={`Activity ${activity.name}`}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 700 }}>{activity.name}</div>
          <div style={{ color: 'var(--muted)', fontSize: 14 }}>{activity.description}</div>
        </div>
        <StatusBadge status={activity.status} />
      </div>
      {activity.updates.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Recent update</div>
          <div style={{ fontSize: 14 }}>{activity.updates[0].content}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{formatDateTime(activity.updates[0].timestamp)}</div>
        </div>
      )}
      <div className="row" style={{ marginTop: 12, gap: 8 }}>
        <Button onClick={addUpdate}>Add Update</Button>
        <Button variant="secondary" onClick={() => changeStatus(nextStatus(activity.status))}>
          Change Status
        </Button>
      </div>
    </div>
  )
}

function nextStatus(s: Activity['status']): Activity['status'] {
  if (s === 'active') return 'paused'
  if (s === 'paused') return 'completed'
  return 'active'
}

export function StatusBadge({ status }: { status: Activity['status'] }) {
  const color = status === 'active' ? '#10b6b0' : status === 'paused' ? '#b69f10' : '#6c9'
  const label = status[0].toUpperCase() + status.slice(1)
  return (
    <span
      style={{
        border: '1px solid #2a3a5f',
        background: '#0f1a2e',
        color,
        padding: '4px 8px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {label}
    </span>
  )
}

