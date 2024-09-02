import { getTodos } from '@/lib/apis/todos'

export default async function Page () {
  const data = await getTodos()
  await new Promise((resolve) => setTimeout(resolve, 4000));
  
  return (
    <>
      <ul>
        {
          data.map((post: any, index: number) => {
            return (
              <li key={`todo-${post.id}`}>{index + 1}. {post.title}</li>
            )
          })
        }
      </ul>
    </>
  )
}