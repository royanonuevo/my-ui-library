'use client'

import { useAppSelector } from '@/redux/hooks'

type Props = {}

export default function Content ({}: Props) {
  const { states, countries } = useAppSelector(state => state.staticDataReducer)
  
  return (
    <div className='grid grid-cols-2'>
      <ul className='flex flex-col gap-2'>
        {states.length? states.map((state: any, index: number) => {
          return (
            <li key={`todo-state-${index}`} className='flex'>
              {index + 1}. {state.label}
            </li>
          )
        }): null}
      </ul>
      <ul className='flex flex-col gap-2'>
        {countries.length? countries.map((country: any, index: number) => {
          return (
            <li key={`todo-country-${index}`} className='flex'>
              {index + 1}. {country.label}
            </li>
          )
        }): null}
      </ul>
    </div>
  )
}