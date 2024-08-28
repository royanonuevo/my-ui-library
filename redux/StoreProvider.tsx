'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'
import { fetchStaticDataStates, fetchStaticDataCountries } from './features/static-data-slice'


export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    storeRef.current.dispatch(fetchStaticDataStates())
    storeRef.current.dispatch(fetchStaticDataCountries())
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}