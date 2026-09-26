import type { Control, RegisterOptions, ControllerProps } from 'react-hook-form'
import type { ClassValue } from 'clsx'
import type { FunctionComponent, ReactNode, SVGProps } from 'react'

export type SvgIcon = FunctionComponent<
  SVGProps<SVGSVGElement> & {
    title?: string
    titleId?: string
    desc?: string
    descId?: string
  }
>

export type InputProps = {
  control: any
  name: string
  rules?: Omit<
    RegisterOptions<any, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  helperText?: string
  helperCb?: (filedValue: string | number) => string
  label?: string
  classNameControl?: string
  clearable?: boolean
  clearCb?: () => void
  prefixIcon?: ReactNode
  ltr?: boolean
}

export type SelectInputItem<T = any> = {
  title: string
  value: string | number | EmptyString | boolean
  itemData?: T
}

export type ScrollTop = number | 'middle' | 'quarterTop' | 'quarterBottom'

export type SelectInputProps<T = any> = {
  options: SelectOptions<T>
  fieldTextClassName?: ClassValue
  scrollTop?: ScrollTop
  itemHoc?: (item: SelectOption<T>) => React.ReactNode
  loading?: boolean
  noItemMessage?: string | React.ReactNode
}

export type DomRect = {
  width: string
  top: string
  left: string
}

export type RenderFC = Pick<ControllerProps, 'render'>
