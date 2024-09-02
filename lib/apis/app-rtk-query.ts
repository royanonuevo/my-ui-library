import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const APP_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api'
const API_NAME = '/todos'

export type Todo = {
  id: string
  title: string,
  [key: string]: any
}

export type TodoAdd = {
  title: string,
}

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: APP_BASE_URL }),
  tagTypes: ['Todo'],
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  endpoints: (build) => ({
    getAllTodo: build.query<Todo[], void>({
      query: () => API_NAME,
      providesTags: (result) => {
        return result? [...result.map(({ id }) => ({ type: 'Todo', id } as const)), { type: 'Todo', id: 'LIST' },]
          : [{ type: 'Todo', id: 'LIST' }]
      },
    }),
    addTodo: build.mutation<void, TodoAdd>({
      query: (body) => ({
        url: API_NAME,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],

    }),
    deleTodo: build.mutation<void, string>({
      query: (id) => {
        return ({
          url: `${API_NAME}/${id}`,
          method: 'DELETE'
        })
      },
      invalidatesTags: (result, error, id) => [{ type: 'Todo', id }],  // eslint-disabled-line
    }),
  })
})

export const { 
  useGetAllTodoQuery,
  useAddTodoMutation,
  useDeleTodoMutation
} = appApi
