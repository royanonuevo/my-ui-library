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
              <div>{ displayInput('name') }</div>
              <div>{ displayInput('email') }</div>
              <div>{ displayInput('password') }</div>
              <div>{ displayInput('password2') }</div>
              <div>{ displayInput('readOnlyInput') }</div>
              <div>{ displayInput('disabledInput') }</div>
              <div>{ displayInput('appendLeftContent') }</div>
              <div>{ displayInput('appendRightContent') }</div>
            </div>
          )
        }}
      </FormLayout>
    </Suspense>
  )
}