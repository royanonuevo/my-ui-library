const BASE_URL = '/api/todos'

export const getTodos = async () => {
  const url = BASE_URL
  return await fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json()
  })
}

export const postTodo = async (newPost: any) => {
  const url = BASE_URL
  return await fetch(url, {
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
  const url = `${BASE_URL}/${todoId}`
  return await fetch(url, {
    method: 'DELETE'
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to delete");
    }

    return res.json()
  })
}