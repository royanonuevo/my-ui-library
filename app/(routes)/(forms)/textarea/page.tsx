'use client'

import { formConfig, formSchema, defaultValues, defaultWithValues } from './config'
import FormLayout from '@/components/FormLayout'

export default function Page () {
  return (
    <FormLayout
      title='Textarea'
      formConfig={formConfig}
      formSchema={formSchema}
      defaultValues={defaultValues}
      defaultWithValues={defaultWithValues}
    >
      {(displayInput: any) => {
        return (
          <div className='grid grid-cols-2 gap-4 mb-4'>
            { displayInput('dummy1') }
            { displayInput('feedback') }
            { displayInput('concern') }
          </div>
        )
      }}
    </FormLayout>
  )
}