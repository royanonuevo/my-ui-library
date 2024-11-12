'use client'

import { Suspense } from 'react'
import { formConfig, formSchema, defaultValues, defaultWithValues } from './config'
import FormLayout from '@/components/FormLayout'

export default function Page () {
  return (
    <Suspense>
      <FormLayout
        title='Radio Group'
        formConfig={formConfig}
        formSchema={formSchema}
        defaultValues={defaultValues}
        defaultWithValues={defaultWithValues}
      >
        {(displayInput: any) => {
          return (
            <div className='grid grid-cols-2 gap-4 mb-4'>
              { displayInput('dummy1') }
              { displayInput('purpose') }
              { displayInput('dummy2') }
            </div>
          )
        }}
      </FormLayout>
    </Suspense>
  )
}