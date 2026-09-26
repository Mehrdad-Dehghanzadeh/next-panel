import type { ReactNode } from 'react'
import type { ComponentProps } from 'react'
import type { InputProps } from '@ts/FormElements'
import { TextField } from '@radix-ui/themes'

type TOmitted = 'size' | 'type' | 'color'

export type InputFieldProps = Omit<ComponentProps<'input'>, TOmitted> &
  InputProps &
  TextField.RootProps & {
    type?: 'number' | 'text' | 'tel' | 'email' | 'url'
    suffix?: ReactNode
    prefix?: ReactNode
    convertValue?: (val: string) => string
  }
