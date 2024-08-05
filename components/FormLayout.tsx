'use client'

import { FieldController, CheckBox } from '@/components/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useModalConfirm } from '@/hooks/useModalConfirm'

type Props = {
  children: any
  title: string
  formConfig: any
  formSchema: any
  defaultValues: any
}

export default function FormLayout ({ 
  children,
  title,
  formConfig,
  formSchema,
  defaultValues
}: Props) {
  const modalConfirm = useModalConfirm()

  const hookForm = useForm<z.infer<typeof formSchema>>({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
    defaultValues
  })
  
  const { 
    handleSubmit, 
    getValues,
    setValue,
    formState: { errors } // eslint-disable-line
  } = hookForm

  const { isDisableFields } = getValues() 

  const onSubmit = async (values: z.infer<typeof formSchema>) => { 
    modalConfirm({
      title: 'Form Submission',
      description: 'This will submit the form, are you sure?'
    })
    .then(() => {
      console.log('onSubmit', values) // eslint-disable-line
    })
    .catch(() => {})
    
  }

  const displayInput = (name: string) => {
    return (
      <FieldController 
        name={name} 
        fieldsConfig={formConfig}  
        hookForm={hookForm}
      />
    )
  }

  const toggleDisableFields = () => {
    setValue('isDisableFields', !isDisableFields) 
  }

  return (
    <>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl'>{ title }</h1>
          <div className='text-sm'>
            <CheckBox 
              value={isDisableFields} 
              label='Disabled All Fields' 
              onChange={toggleDisableFields} 
            />
          </div>
        </div>
        <hr className='mt-5' />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='grid flex-col gap-y-5 text-sm'>
        <div>
          { children(displayInput) }
        </div>
        
        <Button type='submit' className='w-full' variant='default'>Submit</Button>
      </form>
    </>
  )
}