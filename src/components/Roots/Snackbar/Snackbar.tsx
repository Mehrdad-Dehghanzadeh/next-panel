'use client'
import { useEffect, type FC } from 'react'
import { useRootPopUp } from '@hooks'
import type { TSnackbarDetails, TIcons } from './TSnackbar'
import clsx from 'clsx'
import {
  InfoCircledIcon,
  CheckCircledIcon,
  CrossCircledIcon
} from '@radix-ui/react-icons'
import './Snackbar.css'

export const Snackbar: FC = () => {
  const { detail, show, elRef, setShow } = useRootPopUp<TSnackbarDetails>({
    eventName: 'showSnackbar',
    defaultDetails: { type: 'error' }
  })

  const setIcon = () => {
    const icons: TIcons = {
      error: <CrossCircledIcon className="snackbar__icon" />,
      success: <CheckCircledIcon className="snackbar__icon" />,
      info: <InfoCircledIcon className="snackbar__icon" />
    }

    return detail?.type ? icons[detail.type] : null
  }

  const Icon = setIcon()

  const handleShow = () => {
    if (show) {
      setTimeout(() => {
        setShow(false)
      }, 6000)
    }
  }

  useEffect(() => {
    handleShow()
  }, [show])

  return (
    <div
      id="snackbar"
      className={clsx('snackbar', detail?.type ? `snackbar-${detail?.type}` : '', {
        'snackbar--show': show
      })}
      ref={elRef}
    >
      {Boolean(Icon) && Icon}
      {Boolean(detail?.message) && <p>{detail?.message || ''}</p>}
    </div>
  )
}
