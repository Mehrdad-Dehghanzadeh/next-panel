import type { ComponentProps } from 'react'
import type { InputProps } from '@ts/FormElements'
import { TextField } from '@radix-ui/themes'
import type { DayPickerProps } from '@daypicker/react'

type TOmitted = 'size' | 'type' | 'color'

export type DateFieldProps = Omit<ComponentProps<'input'>, TOmitted> &
  InputProps &
  TextField.RootProps & {
    pickerProps?: DayPickerProps
  }
