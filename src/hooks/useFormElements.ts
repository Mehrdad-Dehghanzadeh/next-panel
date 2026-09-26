import { useEffect, useId } from 'react'
import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'

export type TArg = {
  id: string | undefined
  color?: any
  fieldState?: ControllerFieldState
  clearCb?: () => void
  clearable?: boolean
  field?: ControllerRenderProps
  disabled?: boolean
}

export function useFormElements({
  id,
  fieldState,
  color,
  field,
  clearCb,
  clearable,
  disabled
}: TArg) {
  const _id = useId()

  const setSelfId = (): string => {
    return `${_id}-${id ?? ''}`
  }

  const selfId = setSelfId()

  const setColor = () => {
    return fieldState?.invalid ? 'red' : color
  }

  let ownColor = setColor()

  const clear = () => {
    field?.onChange?.('')
    clearCb?.()
  }

  const enableClear = (): boolean => {
    return Boolean(clearable) && Boolean(field?.value) && Boolean(!disabled)
  }

  useEffect(() => {}, [fieldState?.invalid])

  return {
    selfId,
    ownColor,
    enableClear,
    clear
  }
}
