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
            <li className='text-app-error'>TODO: Add indeterminate in Checkbox</li>
          </ul>
          <hr className='my-10' />
          <h2 className='mb-1'>Forms:</h2>
          <ol className='list-disc list-inside flex flex-col gap-1'>
            <li><Link href='/design-pattern/compound-component' className='underline'>Compound Component</Link></li>
          </ol>
        </>
      }
    >
      { children }
    </PageLayout>
  )
}

