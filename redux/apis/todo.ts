import appApi from './appApi'

export type Todo = {
  id: string
  title: string,
  [key: string]: any
}

export type TodoAdd = {
  title: string,
}

const API_NAME = '/todos'

const todoApiWithTag = appApi.enhanceEndpoints({addTagTypes: ['Todo']})

export const todoApi = todoApiWithTag.injectEndpoints({
  endpoints: build => ({
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
  useDeleTodoMutation,
} = todoApi