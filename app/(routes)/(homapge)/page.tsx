import Link from 'next/link'

export default function HomePage () {
  return (
    <main className='min-h-screen flex items-center justify-center py-10 bg-slate-500'>
      <section className='w-full max-w-[600px] bg-white p-8 px-8 rounded-lg'>
        <h1 className='text-2xl mb-5'>Forms</h1>
        <ul>
          <li>1. <Link href='/inputs' className='underline'>Inputs</Link></li>
          <li>2. <Link href='/dropdowns' className='underline'>Input, Dropdown, Checkbox</Link></li>
          <li>2. <Link href='/checkboxes' className='underline'>Checkboxes</Link></li>
        </ul>
      </section>
    </main>
  )
}