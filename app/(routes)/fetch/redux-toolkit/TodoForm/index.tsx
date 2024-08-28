'use client'

import { FieldController } from '@/components/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { formSchema, formConfig, defaultValues } from './config'
import { useAppDispatch } from '@/redux/hooks'
import { addTask } from '@/redux/features/todo-slice'

type Props = {}

export default function TodoForm ({}: Props) {
  const dispatch = useAppDispatch()
  const hookForm = useForm<z.infer<typeof formSchema>>({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
    defaultValues
  })
  
  const { 
    handleSubmit,
    reset
  } = hookForm

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => { 
    dispatch(addTask(values.title))
    reset()
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

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='grid flex-col gap-y-5 text-sm'>
      <div className='flex items-center justify-end gap-4 mb-4'>
        <div className='w-full'>{ displayInput('title') }</div>
        <div className='flex-1'>
          <Button type='submit' className='w-full' variant='default'>Submit</Button>
        </div>
      </div>
    </form>
  )
}