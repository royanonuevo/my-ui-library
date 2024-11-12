'use client'

import { Suspense } from 'react'
import { formConfig, formSchema, defaultValues, defaultWithValues } from './config'
import FormLayout from '@/components/FormLayout'

export default function Page () {
  return (
    <Suspense>
      <FormLayout
        title='Inputs'
        formConfig={formConfig}
        formSchema={formSchema}
        defaultValues={defaultValues}
        defaultWithValues={defaultWithValues}
      >
        {(displayInput: any) => {
          return (
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>{ displayInput('timeHours') }</div>
              <div>{ displayInput('timeMinutes') }</div>
              <div>{ displayInput('debounce') }</div>
            </div>
          )
        }}
      </FormLayout>
    </Suspense>
  )
}