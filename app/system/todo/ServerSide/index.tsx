import { getTodos } from '@/lib/apis/todos'
import { auth } from "@/auth"

export default async function ServerSide () {
  const session: any = await auth()
  // const data = await getTodos()
  // await new Promise((resolve) => setTimeout(resolve, 4000));
  
  return (
    <>
      {/* <div>Hello {session?.user?.username} ({session?.user?.id})</div>
      <ul>
        {
          data.map((post: any, index: number) => {
            return (
              <li key={`todo-${post.id}`}>{index + 1}. {post.title}</li>
            )
          })
        }
      </ul> */}
    </>
  )
}