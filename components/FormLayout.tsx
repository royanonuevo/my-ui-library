'use client'

import { FieldController, CheckBox } from '@/components/form'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useModalConfirm } from '@/hooks/useModalConfirm'
import { useRouter, useSearchParams  } from 'next/navigation'

type Props = {
  children: any
  title: string
  formConfig: any
  formSchema: any
  defaultValues: any
  defaultWithValues?: any
}

export default function FormLayout ({ 
  children,
  title,
  formConfig,
  formSchema,
  defaultValues,
  defaultWithValues = null
}: Props) {
  const router = useRouter()
  const modalConfirm = useModalConfirm()
  const searchParams = useSearchParams()
  const defaultValuesIndicator = 'with-default-values'
  const withDefaultValues = searchParams.get(defaultValuesIndicator) || '0'

  const hookForm = useForm<z.infer<typeof formSchema>>({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
    defaultValues: withDefaultValues == '1'? (defaultWithValues || defaultValues) : defaultValues
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

  const displayInput = (name: string, fieldArrayName: string | null = null) => {
    return (
      <FieldController 
        name={name} 
        fieldsConfig={formConfig}
        fieldArrayName={fieldArrayName}
        hookForm={hookForm}
      />
    )
  }

  const toggleDisableFields = () => {
    setValue('isDisableFields', !isDisableFields) 
  }

  const hookMethods = {
    ...hookForm,
    displayInput
  }

  return (
    <>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl'>{ title }</h1>
          <div className='text-xs flex flex-col text-right'>
            {withDefaultValues == '1'? (
              <span 
                className='underline mb-1 cursor-pointer' 
                onClick={() => {
                  router.push(`?${defaultValuesIndicator}=0`)
                  setTimeout(() => {
                    window.location.reload()
                  }, 500)
                }}
              >With Empty Values</span>
            ) : (
              <span 
                className='underline mb-1 cursor-pointer' 
                onClick={() => {
                  router.push(`?${defaultValuesIndicator}=1`)
                  setTimeout(() => {
                    window.location.reload()
                  }, 500)
                }}
              >With Default Values</span>
            )}
            
            <CheckBox 
              value={isDisableFields} 
              label='Disabled All Fields' 
              onChange={toggleDisableFields} 
            />
          </div>
        </div>
        <hr className='mt-5' />
      </div>

      {/* NOTE: "<FormProvider>" use specifically in multi array fields else you can remove this */}
      <FormProvider {...hookMethods}> 
        <form onSubmit={handleSubmit(onSubmit)} className='grid flex-col gap-y-5 text-sm'>
          <div>
            { children(displayInput) }
          </div>
          
          <Button type='submit' className='w-full' variant='default'>Submit</Button>
        </form>
      </FormProvider>
    </>
  )
}