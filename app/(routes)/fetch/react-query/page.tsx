'use client'

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getTodos, postTodo } from '@/lib/apis/todos'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

export default function Page () {
  const queryClient = useQueryClient()
  const query = useQuery({ 
    queryKey: ['todos'], 
    queryFn: getTodos,
    // staleTime: 5000,
    // refetchInterval: 4000
  })
  const { data: todos, isLoading, error } = query

  const postMutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

 

  if (isLoading) return 'Loading...'

  console.log('error', error)
  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      <h2 className='font-bold mb-5'>Tarnstack Query</h2>
      <TodoForm onSubmit={(values: any) => {
        postMutation.mutate({
          title: values.title
        })
      }} />

      <TodoList 
        todos={todos} 
        isLoading={isLoading} 
      />
    </>
  )
}