'use client'

import { useGetBgCountriesQuery, useGetBgStatesQuery } from '@/redux/apis/bg-data'

type Props ={
  children: any
}
export default function BgDataSync ({ 
  children
}: Props) {
  const queryOptions = { refetchOnFocus: false, refetchOnReconnect: false, refetchOnMountOrArgChange: false }
  useGetBgCountriesQuery(undefined, queryOptions)
  useGetBgStatesQuery(undefined, queryOptions)

  return children
}