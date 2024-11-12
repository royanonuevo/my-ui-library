'use client'

import TodoForm from './TodoForm'
import TodoList from './TodoList'

export default function Page () {
 

  return (
    <>
      <h2 className='font-bold mb-5'>Redux Toolkit</h2>
      <TodoForm />
      <TodoList />
    </>
  )
}