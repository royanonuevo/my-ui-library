'use client'

import { useSession } from 'next-auth/react'

export default function ClientSide () {
  const session: any = useSession()
  return (
    <div>
      Client Side (components):
      <div>Hi {session?.data?.user?.username} ({session?.data?.user?.id})</div>
    </div>
  )
}