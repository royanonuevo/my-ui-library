'use client'

import { setupListeners } from '@reduxjs/toolkit/query'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'
// import { fetchStaticDataStates, fetchStaticDataCountries } from '@/lib/apis/backgroundData'

import { setAuthToken } from './features/auth-slice'


export default function StoreProvider({
  token,
  children
}: {
  token: string
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    
    // storeRef.current.dispatch(fetchStaticDataStates())
    // storeRef.current.dispatch(fetchStaticDataCountries())

    // Set Auth Token Initially
    storeRef.current.dispatch(setAuthToken(token))

    // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
    // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
    setupListeners(storeRef.current.dispatch)  
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}