import type {
  RootProps,
  ColumnHeaderCellProps,
  HeaderProps,
  BodyProps,
  CellProps,
  RowProps
} from '@radix-ui/themes/components/table'
import type { ComponentProps, ReactNode, CSSProperties } from 'react'

export type DataTableHeaderItem<DataTableItem = any> = {
  title: string | ReactNode
  keyData?: string | keyof DataTableItem
  cellFC?: (data: DataTableItem, indexRow: number) => ReactNode
  cellStyle?: CSSProperties
  headStyle?: CSSProperties
  sortKey?: string
}

export type DataTableHeaders<T = any> = DataTableHeaderItem<T>[]

export type DataTableProps<DataTableItem = any> = ComponentProps<'table'> & {
  headers: DataTableHeaders<DataTableItem>
  data: DataTableItem[]
  rootProps?: RootProps
  columnHeaderCellProps?: ColumnHeaderCellProps
  cellProps?: CellProps
  rowProps?: RowProps
  headerProps?: HeaderProps
  bodyProps?: BodyProps
  loading?: boolean
  noItemTitle?: string
  changeSort?: (sort: DataTableSort) => void
  changePaginate?: (paginate: DataTablePaginate) => void
}
