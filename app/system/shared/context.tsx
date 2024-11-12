'use client'

import { createContext, useContext, useEffect } from 'react'
import axios from 'axios'
import { SessionProvider } from 'next-auth/react' 
import { clearAuthInAllTabs } from '@/lib/auth'
import { ConfirmServiceProvider } from '@/hooks/useModalConfirm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import StoreProvider from '@/redux/StoreProvider'
import BgDataSync from './BgDataSync'

type AppContextProps = {
  token: string
  axiosInstance: any
  getAxiosInstance: () => any
}

export const AppContext = createContext<AppContextProps | undefined>(undefined)

type AppContextProviderProps = {
  children: React.ReactNode
  session: any
}

export default function AppContextProvider({
  children,
  session
}: AppContextProviderProps) {
  const queryClient = new QueryClient()
  const token = session?.user?.token || null
  
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/api'
  })

  axiosInstance.interceptors.request.use(request => {
    request.headers['Access-Control-Allow-Origin'] = '*'
    request.headers['Content-Type'] = 'application/json'  // 'multipart/form-data'
    request.headers['Authorization'] = `Bearer ${token}`
    return request
  })

  const getAxiosInstance = () => {
    axiosInstance.interceptors.request.use(request => {
      // request.headers['Access-Control-Allow-Origin'] = '*'
      // request.headers['Content-Type'] = 'application/json'  // 'multipart/form-data'
      // request.headers['Authorization'] = `Bearer ${token}`
      return request
    })

    return axiosInstance
  }

  useEffect(() => {
    clearAuthInAllTabs()
  }, [])

  return (
    <AppContext.Provider 
      value={{ 
        token,
        axiosInstance,
        getAxiosInstance
      }}
    >
      <SessionProvider>
        <StoreProvider token={token}>
          <BgDataSync>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <ConfirmServiceProvider>
                { children}
              </ConfirmServiceProvider>
            </QueryClientProvider>
          </BgDataSync>
        </StoreProvider>
      </SessionProvider>
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider')
  }

  return context
}




