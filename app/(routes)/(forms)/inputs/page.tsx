'use client'

import { formConfig, formSchema, defaultValues } from './config'
import FormLayout from '@/components/FormLayout'

export default function Page () {
  return (
    <FormLayout
      title='Inputs'
      formConfig={formConfig}
      formSchema={formSchema}
      defaultValues={defaultValues}
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
  )
}