import type { ComponentProps } from 'react'
import type { InputProps } from '@ts/FormElements'
import { type TextAreaProps } from '@radix-ui/themes'

type TOmitted = 'size' | 'type' | 'color'

export type TextAreaFieldProps = Omit<ComponentProps<'textarea'>, TOmitted> &
  InputProps &
  TextAreaProps & {
    convertValue?: (val: string) => string
  }
