'use client'

import { useDeleTodoMutation } from '@/redux/apis/todo'

type Props = {
  todos: any
}

export default function TodoList ({
  todos
}: Props) {
  const [ deleteTodo ] = useDeleTodoMutation()

  
  return (
    <ul className='flex flex-col gap-2'>
      {todos.map((todo: any, index: number) => {
        return (
          <li key={`todo-${todo.id}`} className='flex'>
            <div className='flex-1'>{index + 1}. {todo.title}</div>

            <div 
              title='remove' 
              onClick={() => {
                deleteTodo(todo.id)
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