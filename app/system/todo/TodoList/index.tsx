'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTodo } from '@/lib/apis/todos'

type Props = {
  todos: any[]
  isLoading: boolean
}

export default function TodoList ({
  todos,
  isLoading
}: Props) {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['Todos'] })
    },
  })

  if (isLoading) {
    return 'Loading todos...'
  }

  if (!todos.length) {
    return 'No Todos yet.. How about add one?'
  }
  
  return (
    <ul className='flex flex-col gap-2'>
      {todos.map((todo: any, index: number) => {
        return (
          <li key={`todo-${todo.id}`} className='flex'>
            <div className='flex-1'>{index + 1}. {todo.title}</div>

            <div 
              title='remove' 
              onClick={() => {
                deleteMutation.mutate(todo.id)
              }}
              className='cursor-pointer flex items-center m-0 px-[4px] text-white bg-gray-400 text-xs rounded-sm'
            >
              remove
            </div>
          </li>
        )
      })}
    </ul>
  )
}