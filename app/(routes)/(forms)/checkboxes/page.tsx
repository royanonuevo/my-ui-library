'use client'

import { formConfig, formSchema, defaultValues } from './config'
import FormLayout from '@/components/FormLayout'

export default function Page () {
  return (
    <FormLayout
      title='Checkboxes'
      formConfig={formConfig}
      formSchema={formSchema}
      defaultValues={defaultValues}
    >
      {(displayInput: any) => {
        return (
          <div className='grid grid-cols-2 gap-4 mb-4'>
            { displayInput('dummy1') }
            { displayInput('agree') }
            { displayInput('ingredients') }
            { displayInput('dummy2') }
          </div>
        )
      }}
    </FormLayout>
  )
}