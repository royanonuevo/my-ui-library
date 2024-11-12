'use client'

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useAppContext } from "../shared/context"
import TodoList from './TodoList'
import { headers } from "next/headers"

export default function ClientSide () {
  const { axiosInstance } = useAppContext()

  const { data, isLoading, error } = useQuery({ 
    queryKey: ['Todos'], 
    queryFn: async () => {
      return await axiosInstance.get('/todos').then((res: any) => {
        return res.data
      })
    },
  })

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <div>Listing Client Side (components):</div>
      <TodoList 
        todos={data} 
        isLoading={isLoading} 
      />
    </div>
  )
}