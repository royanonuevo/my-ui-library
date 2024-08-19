import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Forms | My UI Library',
  description: 'Generated by create next app',
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ 
  children 
}: RootLayoutProps) {
  return (
    <PageLayout
      sideContent={
        <>
          <h2 className='mb-1'>Checklist:</h2>
          <ul className='mt-2 list-inside list-decimal flex flex-col gap-1'>
            <li>`onBlur` should work</li>
            <li>when click title/label will focus the field</li>
            <li>tab should work</li>
            <li>disabled dependency from other field should work</li>
            <li>Browser Compatibility</li>
          </ul>
          <hr className='my-10' />
          <h2 className='mb-1'>Forms:</h2>
          <ol className='list-disc list-inside flex flex-col gap-1'>
            <li><Link href='/forms/inputs' className='underline'>Inputs</Link></li>
            <li><Link href='/forms/textarea' className='underline'>Textarea</Link></li>
            <li><Link href='/forms/dropdowns' className='underline'>Dropdowns</Link></li>
            <li><Link href='/forms/checkboxes' className='underline'>Checkbox</Link></li>
            <li><Link href='/forms/radio-group' className='underline'>Radio Group</Link></li>
            <li><Link href='/forms/array' className='underline'>Array of Fields</Link></li>
          </ol>
        </>
      }
    >
      { children }
    </PageLayout>
  )
}

