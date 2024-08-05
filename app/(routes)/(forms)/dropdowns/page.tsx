'use client'

import { formConfig, formSchema, defaultValues } from './config'
import FormLayout from '@/components/FormLayout'

export default function Page () {
  return (
    <FormLayout
      title='Dropdowns, Checkbox'
      formConfig={formConfig}
      formSchema={formSchema}
      defaultValues={defaultValues}
    >
      {(displayInput: any) => {
        return (
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div className='flex flex-col gap-4'>
              { displayInput('dummy1') }
              { displayInput('dummy2') }
              { displayInput('agree') }
            </div>
            <div className='flex flex-col gap-4'>
              { displayInput('continents') }
              { displayInput('countries') }
              { displayInput('countries2') }
            </div>
          </div>
        )
      }}
    </FormLayout>
  )
}