import { auth } from "@/auth"
import ClientSide from './ClientSide'
import ServerSide from './ServerSide'

export default async function Landing () {
  const session: any = await auth()
  
  return (
    <div>
      Server Side Page:
      <div>Hello {session?.user?.username} ({session?.user?.id})</div>

      <div className='mt-10'>
        <ClientSide />
      </div>
      <div className='mt-10'>
        <ServerSide />
      </div>
    </div>
  )
}