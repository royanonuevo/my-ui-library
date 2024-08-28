'use client'

import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { deleteTask } from '@/redux/features/todo-slice'

type Props = {}

export default function TodoList ({}: Props) {
  const tasks = useAppSelector(state => state.todoReducer.tasks)
  const dispatch = useAppDispatch()
  
  return (
    <ul className='flex flex-col gap-2'>
      {tasks.length? tasks.map((task: any, index: number) => {
        return (
          <li key={`todo-${task.id}`} className='flex'>
            <div className='flex-1'>{index + 1}. {task.label}</div>

            <div 
              title='remove' 
              onClick={() => {
                dispatch(deleteTask(task.id))
              }}
              className='cursor-pointer flex items-center m-0 px-[4px] text-white bg-gray-400 text-xs rounded-sm'
            >
              remove
            </div>
          </li>
        )
      }): null}
      {tasks.length === 0? (<li>No todos yet.</li>) : null}
    </ul>
  )
}