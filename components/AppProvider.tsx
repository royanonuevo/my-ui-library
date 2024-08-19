'use client'

import { ConfirmServiceProvider } from '@/hooks/useModalConfirm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type Props = {
  children: React.ReactNode
}

export default function AppProvider ({
  children
}: Props) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ConfirmServiceProvider>
        { children }
      </ConfirmServiceProvider>
    </QueryClientProvider>
  )
}