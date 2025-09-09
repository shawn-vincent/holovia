import { ActivityList } from '@/components/activities/ActivityList'
import { ChatDock } from '@/components/chat/ChatDock'
import { auth } from 'next-auth'
import Link from 'next/link'

export default async function HomePage() {
  const session = await auth()
  return (
    <>
      {!session ? (
        <div className="card">
          <h2>Welcome to Holovia</h2>
          <p style={{ color: 'var(--muted)' }}>
            Please sign in with Google to get started.
          </p>
          <Link className="button" href="/api/auth/signin">Sign in with Google</Link>
        </div>
      ) : (
        <>
          <ActivityList />
          <div style={{ height: 24 }} />
          <div style={{ color: 'var(--muted)', fontSize: 12 }}>
            Signed in as {session.user?.name} — <Link href="/api/auth/signout">Logout</Link>
          </div>
        </>
      )}
      <ChatDock />
    </>
  )
}

