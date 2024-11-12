'use client'

import Link from 'next/link'
import { clearAuth } from '@/lib/auth'

export default function Menu () {
  return (
    <>
      <h2 className='mb-1'>Menu:</h2>
      <ol className='list-disc list-inside flex flex-col gap-1'>
        <li><Link href='/system/landing' className='underline'>Landing</Link></li>
        <li><Link href='/system/todo' className='underline'>Todo</Link></li>
        <li><span onClick={() => clearAuth()} className='underline cursor-pointer'>Sign Out</span></li>
      </ol>

      <h2 className='mb-1 mt-5'>Fetch:</h2>
      <ol className='list-disc list-inside flex flex-col gap-1'>
        <li><Link href='/system/fetch/react-query' className='underline'>Client Side (React Query)</Link></li>
        <li><Link href='/system/fetch/server-side' className='underline'>Fetching in Server Side</Link></li>
        <li><Link href='/system/fetch/redux-static-data' className='underline'>Get Static Data (RTK)</Link></li>
        <li><Link href='/system/fetch/redux-toolkit' className='underline'>Todo List (RTK)</Link></li>
        <li><Link href='/system/fetch/redux-toolkit-query' className='underline'>Todo List (RTK Query)</Link></li>
      </ol>
    </>
  )
}