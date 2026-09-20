import type { ReactElement } from 'react'

export type TSnackbarType = 'error' | 'info' | 'success'

export type TIcons = Record<TSnackbarType, ReactElement>

export type TSnackbarDetails = {
  type?: TSnackbarType
  message: string
}
