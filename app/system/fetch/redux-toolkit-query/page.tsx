'use client'

import { useGetAllTodoQuery, useAddTodoMutation } from '@/redux/apis/todo'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

export default function Page () {
  
  const { data, isError, isLoading } = useGetAllTodoQuery()
  const [ addTodos, { isLoading:isAdding } ] = useAddTodoMutation()

  if (isLoading) return 'Loading...'
  if (isError) return 'An error has occurred: ' 

  return (
    <>
      <h2 className='font-bold mb-5'>Redux Toolkit Query</h2>
      <TodoForm onSubmit={(values: any) => {
        addTodos({
          title: values.title
        })
      }} />
      {isAdding? <div className='my-4'>Adding new record...</div>: ''}

      <TodoList 
        todos={data} 
      />
    </>
  )
}