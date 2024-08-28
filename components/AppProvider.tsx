'use client'

import { ConfirmServiceProvider } from '@/hooks/useModalConfirm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import StoreProvider from '@/redux/StoreProvider'

type Props = {
  children: React.ReactNode
}

export default function AppProvider ({
  children
}: Props) {
  const queryClient = new QueryClient()

  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ConfirmServiceProvider>
          { children }
        </ConfirmServiceProvider>
      </QueryClientProvider>
    </StoreProvider>
  )
}