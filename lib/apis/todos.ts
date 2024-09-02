
const APP_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api'
const TODOS_BASE_URL = APP_BASE_URL + '/todos'


export const getTodos = async () => {
  return await fetch(TODOS_BASE_URL).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json()
  })
}

export const postTodo = async (newPost: any) => {
  return await fetch(TODOS_BASE_URL, {
    method: 'POST',
    body: JSON.stringify(newPost)
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to post");
    }

    return res.json()
  })
}

export const deleteTodo = async (todoId: string) => {
  const url = `${TODOS_BASE_URL}/${todoId}`
  return await fetch(url, {
    method: 'DELETE'
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to delete");
    }

    return res.json()
  })
}


