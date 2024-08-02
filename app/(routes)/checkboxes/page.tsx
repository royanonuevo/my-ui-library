'use client'

import { FieldController, CheckBox } from '@/components/form'
import { useForm } from 'react-hook-form'
import { formConfig, formSchema, defaultValues } from './config'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { z } from 'zod'

export default function Page () {

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
  // console.log('errors')
  
  const { isDisableFields } = getValues() 

  const onSubmit = async (values: z.infer<typeof formSchema>) => { 
    console.log('onSubmit', values) // eslint-disable-line
  }

  const displayInput = (name: string) => {
    return (
      <FieldController 
        name={name} 
        // @ts-ignore
        fieldsConfig={formConfig}  
        hookForm={hookForm}
      />
    )
  }

  const toggleDisableFields = () => {
    setValue('isDisableFields', !isDisableFields) 
  }

  return (
    <div>
      <main className='min-h-screen flex items-center justify-center py-10 bg-slate-500'>
        <section className='w-full max-w-[600px] bg-white p-8 px-8 rounded-lg'>

          <div  className='pb-5'>
            <div className='flex justify-between items-center'>
              <h1 className='text-2xl'>Checkboxes</h1>
              <div className='text-sm'>
                <CheckBox isChecked={isDisableFields} label='Disabled All Fields' onChange={toggleDisableFields} />
              </div>
            </div>
            <hr className='mt-5' />
          </div>
          

          <form onSubmit={handleSubmit(onSubmit)} className='grid flex-col gap-y-5 text-sm'>
            <div>
              {/* row start */}
              <div className='grid grid-cols-2 gap-4 mb-4'>
                { displayInput('agree') }
              </div>
              {/* row end */}

              {/* { displayInput('categories') } */}
            </div>
            
            <Button type='submit' className='w-full' variant='default'>Submit</Button>
          </form>
        </section>
      </main>
    </div>
  )
}