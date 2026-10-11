import { useRef, useState } from 'react'
import type { DomRect } from '@ts/FormElements'

export function useDomRect() {
  const [domRect, setDomRect] = useState<DomRect | null>(null)
  const elRef = useRef<HTMLDivElement>(null)

  const calculateDomRect = () => {
    if (elRef.current) {
      const client = elRef.current.getBoundingClientRect()
      setDomRect(() => ({
        width: `${client.width}px`,
        top: `${client.top + client.height}px`,
        left: `${client.x}px`
      }))
    }
  }

  const clearDomRect = () => {
    setDomRect(null)
  }

  return {
    elRef,
    domRect,
    calculateDomRect,
    clearDomRect
  }
}
