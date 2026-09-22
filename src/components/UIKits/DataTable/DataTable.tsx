'use client'
import { type FC, useId, type ReactNode } from 'react'
import type { DataTableProps, DataTableHeaderItem } from './TDataTable'
import clsx from 'clsx'
import { Table } from '@radix-ui/themes'
import { deepClone, hasItem } from '@utils'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import './DataTable.css'

export const DataTable: FC<DataTableProps> = ({
  data,
  loading,
  changeSort,
  changePaginate,
  rootProps = { variant: 'ghost' },
  columnHeaderCellProps = null,
  headerProps = null,
  bodyProps = null,
  cellProps = null,
  rowProps = null,
  className = '',
  noItemTitle = 'اطلاعاتی یافت نشد',
  headers,
  ...props
}) => {
  const ownId = useId()

  const renderCell = (
    head: DataTableHeaderItem,
    recode: any,
    indexRow: number
  ): ReactNode => {
    if (head.cellFC) {
      const cellData = recode[head.keyData as any] || deepClone(recode)
      return head.cellFC(cellData, indexRow)
    }

    if (head.keyData && Object.hasOwn(recode, head.keyData)) {
      return recode[head.keyData as any]
    }

    return <></>
  }

  const showHasNoData = (): boolean => {
    return !loading && !hasItem(data)
  }

  return (
    <div className={clsx('data-table', className)} {...props}>
      <Table.Root {...rootProps}>
        <Table.Header {...headerProps}>
          <Table.Row {...rowProps}>
            {headers?.map((head, index) => (
              <Table.ColumnHeaderCell
                key={`table-head-${ownId}-${index}`}
                {...columnHeaderCellProps}
                style={head.headStyle}
              >
                {head.title}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body {...bodyProps}>
          {data.map((record, indexRow) => (
            <Table.Row {...rowProps} key={`data-table-row-${indexRow}-${ownId}`}>
              {headers?.map((head, indexCell) => (
                <Table.Cell
                  {...cellProps}
                  key={`data-table-row-${indexRow}-${ownId}-${indexCell}`}
                  style={head.cellStyle}
                >
                  {renderCell(head, record, indexRow)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {showHasNoData() && (
        <div className="data-table-no-item">
          <ExclamationTriangleIcon width="auto" height="auto" className="text-4xl ml-2" />
          <strong className="data-table-no-item__title">{noItemTitle}</strong>
        </div>
      )}
    </div>
  )
}
