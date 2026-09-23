import { useEffect, useId } from 'react'
import type { ControllerFieldState } from 'react-hook-form'

export type TArg = {
  id: string | undefined
  color?: any
  fieldState?: ControllerFieldState
}

export function useFormElements({ id, fieldState, color }: TArg) {
  const _id = useId()

  const setSelfId = (): string => {
    return `${_id}-${id ?? ''}`
  }

  const selfId = setSelfId()

  const setColor = () => {
    return fieldState?.invalid ? 'red' : color
  }
  let ownColor = setColor()

  useEffect(() => {
    console.log(ownColor)
  }, [fieldState?.invalid])

  return {
    selfId,
    ownColor
  }
}
