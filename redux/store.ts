import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import todoReducer from './features/todo-slice'
import bgDataReducer from './features/bg-data-slice'
import appApi from '@/redux/apis/appApi'


export const makeStore = () => {
  return configureStore({
    reducer: {
      authReducer,
      todoReducer,
      bgDataReducer,
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
