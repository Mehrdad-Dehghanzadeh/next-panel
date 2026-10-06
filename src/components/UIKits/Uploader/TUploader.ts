import type { ComponentProps, ReactNode, PropsWithChildren } from 'react'
import type { InputProps } from '@ts/FormElements'
import type { ButtonProps } from '@radix-ui/themes'

type TOmitted = 'size' | 'type' | 'color'

type Props = {
  btnText?: ReactNode
  title?: ReactNode
  description?: ReactNode
  variant?: 'dashed' | 'flat'
}

export type UploaderProps = Omit<ComponentProps<'input'>, TOmitted> &
  InputProps &
  ButtonProps &
  PropsWithChildren<Props>

export type ImagePrevProps = {
  file: File
}
