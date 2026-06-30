'use client'

import { usePathname } from 'next/navigation'

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <main id="main-content" className={pathname === '/' ? '' : 'pt-[72px]'}>
      {children}
    </main>
  )
}
