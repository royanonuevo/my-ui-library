import { auth } from "@/auth"

export default async function ServerSide () {
  const session: any = await auth()

  return (
    <div>
      Server Side (components):
      <div>Hello {session?.user?.username} ({session?.user?.id})</div>
    </div>
  )
}