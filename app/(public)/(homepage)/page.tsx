import Link from 'next/link'

export default function HomePage () {
  return (
    <main className='min-h-screen flex items-center justify-center py-10 bg-slate-500'>
      <section className='w-full max-w-[600px] bg-white p-8 px-8 rounded-lg'>
        <ul>
          <li>Let&lsquo;s check the <Link href='/forms/inputs' className='underline'>forms</Link></li>
          <li>Let&lsquo;s check different kinds of <Link href='https://refine.dev/blog/react-design-patterns' className='underline'>design pattern</Link> in react</li>
          <li>Let&lsquo;s check the <Link href='/sign-in/' className='underline'>sign in</Link></li>
        </ul>
      </section>
    </main>
  )
}