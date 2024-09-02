import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './features/todo-slice'
import backgroundDataReducer from './features/background-data-slice'
import { appApi } from '@/lib/apis/app-rtk-query'


export const makeStore = () => {
  return configureStore({
    reducer: {
      todoReducer,
      backgroundDataReducer,
      [appApi.reducerPath]: appApi.reducer,
    },

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),

    // dev tools extension
    devTools: true
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
