import type { ComponentProps } from 'react'
import type { InputProps, SelectInputProps, SelectInputItem } from '@ts/FormElements'
import { Select } from '@radix-ui/themes'

type TOmitted = 'size' | 'type' | 'color'

type SelectProps = Select.TriggerProps & Select.RootProps

export type SelectFieldProps = Omit<ComponentProps<'select'>, TOmitted> &
  SelectInputProps<SelectInputItem> &
  InputProps &
  SelectProps & {
    options?: SelectOptions
    onChange?: (value: string) => void
  }
