import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './features/todo-slice'
import staticDataReducer from './features/static-data-slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      todoReducer,
      staticDataReducer
    },
    devTools: true
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
