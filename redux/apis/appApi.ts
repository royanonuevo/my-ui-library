import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/redux/store'
const APP_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api'


const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.token
      // console.log('prepareHeaders...', token)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  endpoints: () => ({})
})


export default appApi