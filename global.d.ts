type EmptyString = ''

type NumberString = `${number}`

type CssAbsoluteUnit =
  | `${number}cm`
  | `${number}mm`
  | `${number}in`
  | `${number}px`
  | `${number}pt`
  | `${number}pc`

type CssRelativeUnit =
  | `${number}em`
  | `${number}ex`
  | `${number}ch`
  | `${number}rem`
  | `${number}vw`
  | `${number}vh`
  | `${number}vmin`
  | `${number}vmax`
  | `${number}%`

type PxUnit = `${number}px`
type PercentUnit = `${number}%`
type CssSizeValue = CssAbsoluteUnit | CssRelativeUnit

type TData<T = any> = object & Record<string, T>

type TList<T = any> = T[]

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

type EnumType = {
  id: string | number
  name: string | number
  color?: string
  [key: string]: unknown
}

type MapperItem = {
  text: string | number
  color?: string | TColor
  icon?: any
}

type EnumList = Array<EnumType>

declare module '*.css'
declare module '*.scss'
declare module '*.sass'

type Url = {
  href: string
  title?: string
}

type UrlItem = Url & {
  icon?: ReactNode
}

type UrlList = UrlItem[]

type Urls = Record<string, TUrlItem>
interface ApiResponse<T = any> {
  payload: { data: T }
  status_code: number
  status_message: string
}

interface ApiResponseRaw<T = any> {
  payload: T
  status_code: number
  status_message: string
}

type DataList = {
  key: string | number | ReactNode
  value: string | number | ReactNode
}[]

type Sorts = 'Des' | 'Aes' | 'None'

type DataTablePaginate = {
  page: number
  pageSize: number
  totalItem?: number
}

type DataTableSort = {
  field: string
  type: Sorts
}

type SelectOption<T = any> = {
  title: string
  value: string | number | EmptyString | boolean
  itemData?: T
}

type SelectOptions<T = any> = TSelectOption<T>[]
