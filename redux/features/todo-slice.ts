import { createSlice } from '@reduxjs/toolkit'
import { v4 } from 'uuid'

type Tasks = {
  id: string
  label: string
  // [key: string]: any
}

type TodosState = {
  tasks: Tasks[]
  selectedEditTask: any
}

const initialState: TodosState = {
  tasks: [
    { id: v4(), label: "Learn TypeScript" },
    { id: v4(), label: "Clean Car" },
  ],
  selectedEditTask: undefined
}

export const prospectsSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: v4(),
        label: action.payload
      })
    },
    deleteTask: (state, action) => {
      const idxTask = state.tasks.findIndex(
        (task) => task.id === action.payload
      )
      state.tasks.splice(idxTask, 1);
      // state.todos.filter((task, i) => i !== action.payload);
    },
    editTask: (state, action) => {
      const currentTask = {
        id: action.payload.id,
        label: action.payload.label
      };
      // const idxTask = state.todos.findIndex(
      //   (task) => task.id === action.payload
      // );
      // state.inputTaskValue = state.todos[idxTask].label;
      // state.todos[idxTask].label = state.inputTaskValue;
      state.selectedEditTask = currentTask
      // state.todos[idxTask].label = state.inputTaskValue;
    },
  }
})

// Action creators are generated for each case reducer function
export const { 
  addTask,
  deleteTask, 
  editTask 
} = prospectsSlice.actions

export default prospectsSlice.reducer