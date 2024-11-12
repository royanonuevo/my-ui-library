'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formConfig, formSchema, defaultValues } from './config'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { FieldController } from '@/components/form'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"
import Link from 'next/link'

export default function Page () {
  const router = useRouter()
  const hookForm = useForm<z.infer<typeof formSchema>>({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
    defaultValues
  })
  
  const {  handleSubmit } = hookForm

  const onSubmit = async (values: z.infer<typeof formSchema>) => { 
    
    try {
      const auth = await signIn('credentials', {
        ...values,
        redirect: false,
         // callbackUrl: PATHS.PATH_APP_DEFAULT,
      })
      // console.log('auth', auth)
      if (auth?.status === 200) {
        router.push('system/landing')
      } else {
        
      }
    } catch (e) {
      console.warn(e)
    }
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
    <main className='min-h-screen flex items-center justify-center py-10 bg-slate-500'>
      <form onSubmit={handleSubmit(onSubmit)} className='p-5 bg-white rounded-lg w-[400px]'>
        <div className='flex flex-col gap-4 mb-4'>
          <div>{ displayInput('username') }</div>
          <div>{ displayInput('password') }</div>
        </div>
        
        <Link href='/system/landing' className='underline mb-5 float-right'>Try access the system</Link>

        <Button type='submit' className='w-full' variant='default'>Submit</Button>
      </form>
    </main>
  )
}