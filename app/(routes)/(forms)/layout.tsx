import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Form | My UI Library',
  description: 'Generated by create next app',
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ 
  children 
}: RootLayoutProps) {
  return (
    <main className='min-h-screen flex gap-10 bg-slate-500'>
      <aside className='w-[300px] bg-white p-5 text-sm'>
        <h2 className='mb-1'>Checklist:</h2>
        <ul className='mt-2 list-inside list-decimal flex flex-col gap-1'>
          <li>`onBlur` should work</li>
          <li>when click title/label will focus the field</li>
          <li>tab should work</li>
          <li>disabled dependeny from other field should work</li>
          <li>Browser Compatibility</li>
        </ul>
        <hr className='my-10' />
        <h2 className='mb-1'>Forms:</h2>
        <ol className='list-disc list-inside flex flex-col gap-1'>
          <li><Link href='/inputs' className='underline'>Inputs</Link></li>
          <li><Link href='/textarea' className='underline'>Textarea</Link></li>
          <li><Link href='/dropdowns' className='underline'>Dropdowns</Link></li>
          <li><Link href='/checkboxes' className='underline'>Checkbox</Link></li>
          <li><Link href='/radios' className='underline'>Radios</Link></li>
        </ol>
      </aside>
      
      <div className='flex-1 w-full flex items-center justify-center py-10'>
        <section className='w-full max-w-[600px] bg-white p-8 px-8 rounded-lg'>
          { children }
        </section>
      </div>
    </main>
  )
}

