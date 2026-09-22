'use client'
import { PropsWithChildren, type FC, Suspense } from 'react'

export const MainContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main id="main-container" className="main-container">
      <Suspense fallback={<h1>'loading'</h1>}>{children}</Suspense>
    </main>
  )
}
