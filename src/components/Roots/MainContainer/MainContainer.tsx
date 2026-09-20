'use client'
import { PropsWithChildren, type FC, Suspense, use, useState } from 'react'
import { Container } from '@radix-ui/themes'

export const MainContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container className="main-container">
      <Suspense fallback={<h1>'loading'</h1>}>{children}</Suspense>
    </Container>
  )
}
